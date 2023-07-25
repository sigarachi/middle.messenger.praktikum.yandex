import { EventBus } from '../../lib';
import Handlebars from 'handlebars';

const isObject = (value) => {
	return typeof value === 'object' && value !== null;
};

export type Dictionary = Record<string, any>;

function cloneDeep(obj) {
	if (!isObject(obj)) {
		return;
	}

	if (Array.isArray(obj)) {
		return obj.reduce((acc, item) => {
			acc.push(isObject(item) ? cloneDeep(item) : item);
			return acc;
		}, []);
	} else {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			acc[key] = isObject(value) ? cloneDeep(value) : value;
			return acc;
		}, {});
	}
}

export class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element = null;
	_meta = null;
	private props: Dictionary;
	private eventBus: () => EventBus;
	private _elementId: string;
	private _template: HandlebarsTemplateDelegate<any>;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(tagName = 'div', props: Dictionary = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);
		const { template } = this.props;

		this.eventBus = () => eventBus;
		this._template = Handlebars.compile(template);

		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount(oldProps) {
		this.componentDidMount(oldProps);
	}

	// Может переопределять пользователь, необязательно трогать
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidMount(oldProps) {}

	dispatchComponentDidMount() {}

	_componentDidUpdate(oldProps, newProps) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}

		return response;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidUpdate(oldProps, newProps) {
		return false;
	}

	setProps = (nextProps) => {
		if (!nextProps) {
			return;
		}

		const oldProps = cloneDeep(this.props); // deepClone
		this.props = Object.assign(this.props, nextProps);

		this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
	};

	get element() {
		return this._element;
	}

	_render() {
		this._elementId = this.props.dataId;
		this._element.appendChild(this.render());
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
		this._addEventListeners();
	}

	// Может переопределять пользователь, необязательно трогать
	render() {
		const container = document.createElement('div');
		container.innerHTML = this._template(this.props);
		return container.firstElementChild;
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: Dictionary) {
		const self = this;

		const propsProxy = new Proxy<Dictionary>(props, {
			set(target: Dictionary, prop: string, value: any): boolean {
				const old = self.props[prop];
				target[prop] = value;

				if (old !== value) {
					self.eventBus().emit(Block.EVENTS.FLOW_RENDER);
				}

				return true;
			},

			deleteProperty(): boolean {
				throw new Error('Нет доступа');
			},
		});

		return propsProxy;
	}

	transformToString(): string {
		const container = document.createElement('div');
		container.appendChild(this.element);
		return container.innerHTML;
	}

	_createDocumentElement(tagName) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private _triggerEvent(event: Event, func: Function) {
		const target = event.target as HTMLElement;
		const id = target.getAttribute('data-id');

		if (target && this._elementId === id) {
			event.preventDefault();
			func.call(this, event);
		}
	}

	private _addEventListeners() {
		const { events } = this.props;
		Object.keys(events).forEach((event) => {
			const app = document.querySelector('#app') as HTMLElement;
			app.addEventListener(
				event,
				(e: Event) => {
					this._triggerEvent(e, events[event]);
				},
				true
			);
		});
	}

	private _removeEventListeners() {
		const { events = {} } = this.props;
		Object.keys(events).forEach((event) => {
			const app = document.querySelector('#app') as HTMLElement;
			app.removeEventListener(event, (e: Event) => {
				this._triggerEvent(e, events[event]);
			});
		});
	}

	show() {
		this.getContent().style.display = 'block';
	}

	hide() {
		this.getContent().style.display = 'none';
	}
}

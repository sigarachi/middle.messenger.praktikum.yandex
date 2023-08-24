import { EventBus } from '../../lib';
import Handlebars from 'handlebars';

const isObject = (value: unknown) => {
	return typeof value === 'object' && value !== null;
};

export type Dictionary = Record<string, any>;

export type BlockProps = {
	context?: Dictionary;
	template?: string;
	events: { [event: string]: any };
} & Record<string, any>;

export interface IMetaBlock {
	tagName: string;
	props: Dictionary;
	className?: string;
}

function cloneDeep(obj: unknown) {
	if (!isObject(obj)) {
		return;
	}

	if (Array.isArray(obj)) {
		return obj.reduce((acc, item) => {
			acc.push(isObject(item) ? cloneDeep(item) : item);
			return acc;
		}, []);
	} else {
		return Object.entries(obj as object).reduce((acc, [key, value]) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
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

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	_element: HTMLElement;
	_meta: IMetaBlock;
	protected props: BlockProps;
	private eventBus: () => EventBus;
	private _elementId: string = '';
	protected _template: HandlebarsTemplateDelegate<any>;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(tagName = 'div', props: BlockProps) {
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

	_registerEvents(eventBus: EventBus) {
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

	_componentDidMount() {
		this.componentDidMount();
	}

	// Может переопределять пользователь, необязательно трогать
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidMount() {}

	dispatchComponentDidMount() {}

	_componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}

		return response;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
	//@ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
		return false;
	}

	setProps = (nextProps: BlockProps) => {
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

		const child = this.render();

		if (child !== null) this._element.appendChild(child);

		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
		this._addEventListeners();
	}

	// Может переопределять пользователь, необязательно трогать
	render(): Element | null {
		const container = document.createElement('div');
		container.innerHTML = this._template(this.props);
		return container.firstElementChild;
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: BlockProps) {
		const self = this;

		const propsProxy = new Proxy<BlockProps>(props, {
			set(target: BlockProps, prop: string, value: any): boolean {
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

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	private _triggerEvent(event: Event, func: Function) {
		const target = event.target as HTMLElement;
		const id = target.getAttribute('data-id');
		console.log(id, this._elementId);

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

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	show() {
		this.getContent().style.display = 'block';
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	hide() {
		this.getContent().style.display = 'none';
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	remove() {
		this._removeEventListeners();
		this._element.remove();
	}
}

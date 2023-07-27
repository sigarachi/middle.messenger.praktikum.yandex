interface SchemaProps {
	min?: number;
	max?: number;
	matches?: string | RegExp;
	notEmpty?: boolean;
}

const showWarningMessage = (input: HTMLInputElement, isError: boolean) => {
	const parent = input.parentNode || input.parentElement;
	const messageElement = parent && parent.querySelector('.form-input-message');

	if (messageElement) {
		if (isError) {
			messageElement.classList.remove('hidden');
		} else {
			messageElement.classList.add('hidden');
		}
	}
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SchemaInterface {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	[key: string]: SchemaProps;
}

function isLess(value: string | number, condition: number): boolean {
	if (typeof value === 'string' || Array.isArray(value))
		return Number(value.length) < condition;

	return Number(value) < condition;
}

function isGreater(value: string | number, condition: number): boolean {
	if (typeof value === 'string' || Array.isArray(value))
		return Number(value.length) > condition;

	return Number(value) > condition;
}

function isEmpty(value: string | Array<any>): boolean {
	return Boolean(value.length);
}

function matches(value: string, condition: string | RegExp): boolean {
	return Boolean(value.match(condition));
}

const checks = {
	min: isGreater,
	max: isLess,
	notEmpty: isEmpty,
	matches,
};

export function validateForm(form: HTMLFormElement, schema: SchemaInterface) {
	const inputs = form.querySelectorAll('input');

	inputs.forEach((input) => validateField(schema[input.name], { input }));
}

export function validate<T extends object>(
	schema: SchemaInterface,
	data: T
): boolean {
	try {
		Object.keys(schema).map((schemaKey) => {
			Object.keys(schema[schemaKey]).map((condition) => {
				Object.keys(data).map(() => {
					if (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						!checks[condition](data[schemaKey], schema[schemaKey][condition])
					) {
						throw new Error();
					}
				});
			});
		});
		return true;
	} catch (e) {
		return false;
	}
}

export function validateField(
	schema: SchemaProps,
	data: { event?: Event; input?: HTMLInputElement }
): boolean {
	try {
		const field = (data.event?.target as HTMLInputElement) || data.input;
		Object.keys(schema).map((item) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			showWarningMessage(field, !checks[item](field.value, schema[item]));
		});
		return true;
	} catch (e) {
		return false;
	}
}

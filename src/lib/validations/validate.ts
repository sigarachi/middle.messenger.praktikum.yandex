interface SchemaProps {
	min?: number;
	max?: number;
	matches?: string | RegExp;
	notEmpty?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SchemaInterface<T> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	[key: keyof typeof T]: SchemaProps;
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

export function validate<T extends object>(
	schema: SchemaInterface<T>,
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

export function validateField<T>(field: T, schema: SchemaProps): boolean {
	try {
		Object.keys(schema).map((item) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			if (!checks[item](field, schema[item])) {
				throw new Error();
			}
		});
		return true;
	} catch (e) {
		return false;
	}
}

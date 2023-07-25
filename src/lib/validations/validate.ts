interface SchemaProps {
	min?: number;
	max?: number;
	matches?: string | RegExp;
	notEmpty?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SchemaInterface<T> {
	[key: keyof typeof T]: SchemaProps;
}

function isLess(value, condition): boolean {
	if (typeof value === 'string' || Array.isArray(value))
		return Number(value.length) < condition;

	return Number(value) < condition;
}

function isGreater(value, condition): boolean {
	if (typeof value === 'string' || Array.isArray(value))
		return Number(value.length) > condition;

	return Number(value) > condition;
}

function isEmpty(value): boolean {
	return value.length;
}

function matches(value, condition): boolean {
	return value.matches(condition);
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
			if (!checks[item](field, schema[item])) {
				throw new Error();
			}
		});
		return true;
	} catch (e) {
		return false;
	}
}

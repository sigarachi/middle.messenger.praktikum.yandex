export const passwordSettingsSchema = {
	password: {
		min: 8,
		max: 40,
		notEmpty: true,
		matches: new RegExp(/([a-z][A-Z])|([A-Z][a-z])|([0-9])/),
	},
};

export const userSettingsSchema = {
	first_name: {
		notEmpty: true,
		matches: new RegExp(/^[a-z ,.'-]+$/i),
	},
	second_name: {
		notEmpty: true,
		matches: new RegExp(/^[a-z ,.'-]+$/i),
	},
	phone: {
		notEmpty: true,
		matches: new RegExp(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/),
	},
	login: {
		min: 3,
		max: 20,
		matches: new RegExp(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i),
	},
	email: {
		notEmpty: true,
		matches: new RegExp('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$'),
	},
};

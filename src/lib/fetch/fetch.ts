// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type RequestOptions = {
	method: keyof typeof METHODS;
};

export type FetchResponse = {
	ok: boolean;
	response?: string | object;
	error?: string | object;
};

const handleFetchResponse = ({
	response,
	status,
	statusText,
}): FetchResponse => {
	if (status === 200) {
		try {
			const data = JSON.parse(response);
			return {
				ok: true,
				response: data,
			};
		} catch (e) {
			return {
				ok: true,
				response: response,
			};
		}
	} else {
		console.error(statusText);
		try {
			const error = JSON.parse(response);
			return {
				ok: false,
				error,
			};
		} catch (e) {
			return {
				ok: false,
				error: response,
			};
		}
	}
};

export type Options = {
	headers?: Headers;
	data?: any;
	timeout?: number;
	credentials?: string;
	mode?: string;
} & RequestOptions;

export class Fetch {
	constructor() {}

	get(url: string, options: Options) {
		return this.request(
			url,
			{ ...options, method: METHODS.GET },
			options.timeout
		);
	}

	post(url: string, options: Options) {
		return this.request(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	}

	put(url: string, options: Options) {
		return this.request(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	}

	delete(url: string, options: Options) {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	}

	request(url: string, options: Options, timeout = 5000): Promise<any> {
		const { method, headers: optionsHeaders, data } = options;
		const headers = {
			accept: 'application/json',
			...optionsHeaders,
		};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			const urlObject = new URL(url);

			// set query params
			if (method === METHODS.GET && data) {
				Object.entries(data).forEach(([param, value]) => {
					urlObject.searchParams.set(param, value as string);
				});
			}

			xhr.open(method, urlObject.toString());
			xhr.withCredentials = true;

			xhr.timeout = timeout;

			if (headers) {
				Object.entries(headers).forEach(([header, value]) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					xhr.setRequestHeader(header, value);
				});
			}

			xhr.onload = () => {
				const response = handleFetchResponse(xhr);
				if (!response.ok) reject(response);
				resolve(response);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.setRequestHeader('content-type', 'application/json');
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.setRequestHeader('content-type', 'application/json');
				xhr.send(JSON.stringify(data));
			}
		});
	}
}

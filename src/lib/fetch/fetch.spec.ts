import { expect, use } from 'chai';
import { describe, it, afterEach } from 'mocha';
import sinonChai from 'sinon-chai';
import { SinonStub, createSandbox } from 'sinon';
import { Fetch } from './fetch';
import { METHODS } from './fetch';

describe('Fetch', () => {
	use(sinonChai);
	const sandbox = createSandbox();
	let fetch: Fetch;
	let request: SinonStub<any>;

	beforeEach(() => {
		fetch = new Fetch('');
		request = sandbox
			.stub(fetch, 'request')
			.callsFake(() => Promise.resolve() as Promise<any>);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('Fetch.get method passing data', () => {
		const requestOptions = {
			data: { key1: 1, key2: 2, key3: '213' },
			timeout: 5000,
		};

		fetch.get('', { method: 'GET', ...requestOptions });
		expect(request.args[0]).to.be.deep.eq([
			'',
			{ ...requestOptions, method: METHODS.GET },
			5000,
		]);
	});

	it('Fetch.post method passing data', () => {
		const requestOptions = {
			data: JSON.stringify({ a: 1, b: 2 }),
			timeout: 5000,
		};

		fetch.post('', { ...requestOptions, method: 'POST' });
		expect(request.args[0]).to.be.deep.eq([
			'',
			{ ...requestOptions, method: METHODS.POST },
			5000,
		]);
	});

	it('Fetch.put method passing data', () => {
		const requestOptions = {
			data: JSON.stringify({ a: 1, b: 2 }),
			timeout: 5000,
		};

		fetch.put('', { ...requestOptions, method: 'PUT' });
		expect(request.args[0]).to.be.deep.eq([
			'',
			{ ...requestOptions, method: METHODS.PUT },
			5000,
		]);
	});

	it('Fetch.delete method passing data', () => {
		const requestOptions = {
			data: JSON.stringify({ a: 1, b: 2 }),
			timeout: 5000,
		};

		fetch.delete('', { ...requestOptions, method: 'DELETE' });
		expect(request.args[0]).to.be.deep.eq([
			'',
			{ ...requestOptions, method: METHODS.DELETE },
			5000,
		]);
	});
});

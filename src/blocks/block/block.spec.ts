import { expect } from 'chai';
import { Block } from './block';
import { beforeEach, describe, it } from 'mocha';

describe('Block', () => {
	let block: Block;
	beforeEach(() => {
		block = new Block('div', {
			template: '<div></div>',
			context: {},
			events: {},
		});
	});

	it('block.setProps() must store new Props', () => {
		block.setProps({
			events: {},
			props: {
				awesomeProps: 'awesomeProps',
			},
		});
		expect(block.getProps().props).to.have.property(
			'awesomeProps',
			'awesomeProps'
		);
	});
});

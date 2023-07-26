import { Dictionary } from '../../blocks';

export interface IFormProps {
	children?: {
		inputs?: Dictionary[];
		button?: Dictionary;
	};
	content?: string;
	className?: string;

	dataId?: string;
}

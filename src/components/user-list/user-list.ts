import { Block } from '../../blocks';
import { IUser } from '../user-settings/user-settings.interfaces';
import { userListTemplate } from './user-list.tmplt';
import { UserListItem } from './user-list-item';
import { ChatController } from '../../controllers/chat-controller';
import { Store } from '../../lib/store';

const getTemplate = (userList: Array<IUser>): string => {
	const data = userList.map((item) =>
		new UserListItem(
			{
				dataId: item.id.toString(),
				...item,
			},
			{
				click: async () => {
					await ChatController.removeUserFromChat({
						chatId: Store.getState('currentChat').currentChat.id,
						users: [item.id],
					});

					window.location.reload();
				},
			}
		).transformToString()
	);

	return userListTemplate({ userList: data });
};

export interface UserListProps {
	userList: Array<IUser>;
}

export class UserList extends Block {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	constructor(context: UserListProps, events) {
		super('div', {
			context,
			events,
			template: getTemplate(context.userList),
		});
	}
}

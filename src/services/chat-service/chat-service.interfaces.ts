export interface IChat {
	avatar: string | null;
	created_by: number;
	id: number;
	last_message: string | null;
	title: string;
	unread_count: number;
}

import { router } from './src';
import { ChatPage } from './src/pages/chat-page';
import { AuthPage, RegisterPage } from './src';

router
	.use('/sign-up', RegisterPage)
	.use('/settings', ChatPage, {
		settingsOpen: true,
		chatSettingsOpen: true,
		createFormOpen: false,
	})
	.use('/create-chat', ChatPage, {
		createFormOpen: true,
		settingsOpen: false,
		chatSettingsOpen: false,
	})
	.use('/chat-settings', ChatPage, {
		createFormOpen: false,
		settingsOpen: false,
		chatSettingsOpen: true,
	})
	.use('/', AuthPage)
	.use('/messenger', ChatPage, { settingsOpen: false });

router.start();

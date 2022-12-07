import { Telegraf } from 'telegraf';
import { bot_token, chat_id } from './config';
import { IOrder } from './models/order';

const bot = new Telegraf(bot_token);

const notify = (order: IOrder) => {
	let telegramMessage = `Новый заказ!

Имя: ${order.name}
Номер телефона: ${order.phoneNumber}
Адрес: ${order.address}

Количество: ${order.quantity}
Сумма: ${order.amount}

ID заказа: ${order._id}
`;

	bot.telegram.sendMessage(chat_id, telegramMessage);
};

const startBot = async () => {
	try {
		await bot.launch();
		console.info('Telegram notification bot launched');
	} catch (error) {
		console.error('Telegram bot failed to launch: ', error);
	}
};

const stopBot = async () => {
	bot.stop('Server shutdown');
	console.info('Telegram notification bot stopped');
};

export { startBot, stopBot, notify };

import { Telegraf } from 'telegraf';
import { bot_token, chat_id } from './config';
import log from './utils/logger';

const bot = new Telegraf(bot_token);

const sendOrderInfo = (name: string, phoneNumber: string, address: string, orderNumber: number) => {
	let telegramMessage = `Новый заказ!

Имя: ${name}
Номер телефона: ${phoneNumber}
Адрес: ${address}

Номер заказа: ${orderNumber}
`;

	bot.telegram.sendMessage(chat_id, telegramMessage);
};

const startBot = async () => {
	try {
		await bot.launch();
		log.info('Telegram notification bot launched');
	} catch (error) {
		log.error('Telegram bot failed to launch: ', error);
	}
};

const stopBot = async () => {
	bot.stop('Server shutdown');
	log.info('Telegram notification bot stopped');
};

export { startBot, stopBot, sendOrderInfo };

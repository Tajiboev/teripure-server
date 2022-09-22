import { Telegraf } from 'telegraf';
import { bot_token } from './config';
import log from './logger';

const bot = new Telegraf(bot_token);

const sendOrderInfo = (name: string, phoneNumber: string, address: string, orderNumber: number) => {
	let telegramMessage = `Новый заказ!

Имя: ${name}
Номер телефона: ${phoneNumber}
Адрес: ${address}

Номер заказа: ${orderNumber}
`;

	bot.telegram.sendMessage('-1001783472432', telegramMessage);
};

const launchBot = async () => {
	await bot.launch();
	log.info('Telegram notification bot launched');
};

const stopBot = () => {
	bot.stop('Server shutdown');
	log.info('Telegram notification bot stopped');
};

export { launchBot, stopBot, sendOrderInfo };

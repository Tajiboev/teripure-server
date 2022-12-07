"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = exports.stopBot = exports.startBot = void 0;
const telegraf_1 = require("telegraf");
const config_1 = require("./config");
const bot = new telegraf_1.Telegraf(config_1.bot_token);
const notify = (order) => {
    let telegramMessage = `Новый заказ!

Имя: ${order.name}
Номер телефона: ${order.phoneNumber}
Адрес: ${order.address}

Количество: ${order.quantity}
Сумма: ${order.amount}

ID заказа: ${order._id}
`;
    bot.telegram.sendMessage(config_1.chat_id, telegramMessage);
};
exports.notify = notify;
const startBot = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bot.launch();
        console.info('Telegram notification bot launched');
    }
    catch (error) {
        console.error('Telegram bot failed to launch: ', error);
    }
});
exports.startBot = startBot;
const stopBot = () => __awaiter(void 0, void 0, void 0, function* () {
    bot.stop('Server shutdown');
    console.info('Telegram notification bot stopped');
});
exports.stopBot = stopBot;

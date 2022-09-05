import { Telegraf } from 'telegraf';
import { BOT_TOKEN } from './config';

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

export default bot;

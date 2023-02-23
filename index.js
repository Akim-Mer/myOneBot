const TelegramBot = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')



const token = '6204360018:AAGbv8QrqpC3ajJ9iBKgPDtUr9y_2xXGLZg';

const bot = new TelegramBot(token, {polling: true});

const chats = {

}


const startGame = async (chatId) => {
	await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 3, а ты должен угадать`);
	const randomNum = Math.floor(Math.random() * (3 - 1 + 1) + 1);
	chats[chatId] = randomNum;
	await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Начальная комманда'},
		{command: '/info', description: 'Информация'},
		{command: '/game', description: 'Начать игру'},
	])
	
	bot.on('message', async(msg) => {
	
		const text = msg.text;
		const chatId = msg.chat.id;
		const autor = msg.chat.first_name;
	
		if(text === '/start') {
			bot.sendMessage(chatId, `Добро пожаловать в бота от ${autor}`)	
		}
		if(text === '/info') {
			bot.sendMessage(chatId, `Небольшая информация о ${autor}`)	
		}

		if (text === '/game') {
			return startGame(chatId);
		}
	});

	bot.on('callback_query', msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;
		if (data === '/again') {
			return startGame(chatId);
		}
		if (data === chats[chatId]) {
			return bot.sendMessage (chatId, `Круто, ты отгадал цифру - ${chats[chatId]}`, againOptions);
		} else {
			return bot.sendMessage (chatId, `Увы, но цифра - ${chats[chatId]}`, againOptions);

		}
		
	})
}

start();
module.exports = {
	gameOptions:{
		reply_markup: JSON.stringify({
			inline_keyboard:[
				[{text: 'Кнопка 1', callback_data: '1'},{text: 'Кнопка 2', callback_data: '2'},{text: 'Кнопка 3', callback_data: '3'}],				
			]
		})
	},
	
	againOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard:[
				[{text: 'Играть снова', callback_data: '/again'},],
				
			]
		})
	}
	
}
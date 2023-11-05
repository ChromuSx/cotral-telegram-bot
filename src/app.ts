import bot from './bot/bot';

bot.launch().then(() => {
	console.log('Il bot è avviato!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
  
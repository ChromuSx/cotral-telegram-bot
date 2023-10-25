"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPolesBotActions = void 0;
const telegraf_1 = require("telegraf");
function registerPolesBotActions(bot) {
    bot.action('getfavoritepoles', async (ctx) => {
        const myCtx = ctx;
        myCtx.session.command = 'getfavoritepoles';
    });
    bot.action('getpolesbycode', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci il codice:');
        myCtx.session.command = 'getpolesbycode';
    });
    bot.action('getpolesbyposition', async (ctx) => {
        const myCtx = ctx;
        myCtx.session.command = 'getpolesbyposition';
        const keyboard = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            telegraf_1.Markup.button.callback('Inserisco manualmente', 'enter_position_manually')
        ]);
        await myCtx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    });
    bot.action('use_current_position', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Condividi la tua posizione:', telegraf_1.Markup.keyboard([
            telegraf_1.Markup.button.locationRequest('Condividi Posizione')
        ]).resize());
    });
    bot.action('enter_position_manually', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Per favore, invia la posizione utilizzando l\'icona graffetta ("📎") e poi "Posizione".');
    });
    bot.action('getpolebyarrivalanddestination', async (ctx) => {
        const myCtx = ctx;
        myCtx.session.command = 'getpolebyarrivalanddestination';
        myCtx.session.step = 'arrival';
        myCtx.session.params = {};
        await myCtx.reply(`Inserisci l'arrivo:`);
    });
    bot.action('getallpolesdestinationsbyarrival', async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply('Inserisci la località di arrivo:');
        myCtx.session.command = 'getallpolesdestinationsbyarrival';
    });
}
exports.registerPolesBotActions = registerPolesBotActions;

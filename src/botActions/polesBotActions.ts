import { Markup } from "telegraf";
import { MyContext } from "../interfaces/MyContext";

export function registerPolesBotActions(bot: any) {

    bot.action('getfavoritepoles', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        myCtx.session.command = 'getfavoritepoles';
    });

    bot.action('getpolesbycode', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Inserisci il codice:');
        myCtx.session.command = 'getpolesbycode';
    });

    bot.action('getpolesbyposition', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        myCtx.session.command = 'getpolesbyposition';
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            Markup.button.callback('Inserisco manualmente', 'enter_position_manually')
        ]);
        await myCtx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    });

    bot.action('use_current_position', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Condividi la tua posizione:', Markup.keyboard([
            Markup.button.locationRequest('Condividi Posizione')
        ]).resize());
    });

    bot.action('enter_position_manually', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Per favore, invia la posizione utilizzando l\'icona graffetta ("📎") e poi "Posizione".');
    });

    bot.action('getpolebyarrivalanddestination', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        myCtx.session.command = 'getpolebyarrivalanddestination';
        myCtx.session.step = 'arrival';
        myCtx.session.params = {};
        await myCtx.reply(`Inserisci l'arrivo:`);
    });

    bot.action('getallpolesdestinationsbyarrival', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Inserisci la località di arrivo:');
        myCtx.session.command = 'getallpolesdestinationsbyarrival';
    });
}
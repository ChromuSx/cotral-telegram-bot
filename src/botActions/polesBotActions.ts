import { Markup } from "telegraf";
import { ExtendedContext } from "../interfaces/ExtendedContext";
import { PolesCommands } from "../commands/polesCommands";

export function registerPolesBotActions(bot: any) {

    const polesMenu = Markup.inlineKeyboard([
        Markup.button.callback('Preferiti', `poles:${PolesCommands.GetFavoritePoles}`),
        Markup.button.callback('Codice', PolesCommands.GetPolesByCode),
        Markup.button.callback('Posizione', PolesCommands.GetPolesByPosition),
        Markup.button.callback('Arrivo e destinazione', PolesCommands.GetPoleByArrivalAndDestination),
        Markup.button.callback('Località di arrivo', PolesCommands.GetAllPolesDestinationsByArrival)
    ]);

    bot.action('POLES_MENU', async (ctx: any) => {
        await ctx.editMessageText('Seleziona un\'opzione:', polesMenu);
    });

    bot.action(PolesCommands.GetFavoritePoles, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        myCtx.session.command = 'getfavoritepoles';
    });

    bot.action(PolesCommands.GetPolesByCode, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Inserisci il codice:');
        myCtx.session.command = PolesCommands.GetPolesByCode;
    });

    bot.action(PolesCommands.GetPolesByPosition, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        myCtx.session.command = PolesCommands.GetPolesByPosition;
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            Markup.button.callback('Inserisco manualmente', 'enter_position_manually')
        ]);
        await myCtx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    });

    bot.action('use_current_position', async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Condividi la tua posizione:', Markup.keyboard([
            Markup.button.locationRequest('Condividi Posizione')
        ]).resize());
    });

    bot.action('enter_position_manually', async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Per favore, invia la posizione utilizzando l\'icona graffetta ("📎") e poi "Posizione".');
    });

    bot.action(PolesCommands.GetPoleByArrivalAndDestination, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        myCtx.session.command = PolesCommands.GetPoleByArrivalAndDestination;
        myCtx.session.step = 'arrival';
        myCtx.session.params = {};
        await myCtx.reply(`Inserisci l'arrivo:`);
    });

    bot.action(PolesCommands.GetAllPolesDestinationsByArrival, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Inserisci la località di arrivo:');
        myCtx.session.command = PolesCommands.GetAllPolesDestinationsByArrival;
    });
}
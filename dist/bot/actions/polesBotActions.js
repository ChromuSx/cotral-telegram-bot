"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPolesBotActions = void 0;
const telegraf_1 = require("telegraf");
const polesCommands_1 = require("../../commands/polesCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
function registerPolesBotActions(bot) {
    const polesMenu = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Preferiti', `poles:${polesCommands_1.PolesCommands.GetFavoritePoles}`),
        telegraf_1.Markup.button.callback('Codice', polesCommands_1.PolesCommands.GetPolesByCode),
        telegraf_1.Markup.button.callback('Posizione', polesCommands_1.PolesCommands.GetPolesByPosition),
        telegraf_1.Markup.button.callback('Arrivo e destinazione', polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination),
        telegraf_1.Markup.button.callback('Località di arrivo', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival)
    ]);
    bot.action('POLES_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', polesMenu);
    });
    bot.action(polesCommands_1.PolesCommands.GetFavoritePoles, async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetFavoritePoles;
    });
    bot.action(polesCommands_1.PolesCommands.GetPolesByCode, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice:', polesCommands_1.PolesCommands.GetPolesByCode);
    });
    bot.action(polesCommands_1.PolesCommands.GetPolesByPosition, async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetPolesByPosition;
        const keyboard = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            telegraf_1.Markup.button.callback('Inserisco manualmente', 'enter_position_manually')
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    });
    bot.action('use_current_position', async (ctx) => {
        await ctx.reply('Condividi la tua posizione:', telegraf_1.Markup.keyboard([
            telegraf_1.Markup.button.locationRequest('Condividi Posizione')
        ]).resize());
    });
    bot.action('enter_position_manually', async (ctx) => {
        await ctx.reply('Per favore, invia la posizione utilizzando l\'icona graffetta ("📎") e poi "Posizione".');
    });
    bot.action(polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination, async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination;
        ctx.session.step = 'arrival';
        ctx.session.params = {};
        await ctx.reply(`Inserisci l'arrivo:`);
    });
    bot.action(polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località di arrivo:', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival);
    });
}
exports.registerPolesBotActions = registerPolesBotActions;

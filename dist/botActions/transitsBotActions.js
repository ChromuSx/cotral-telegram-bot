"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTransitsBotActions = void 0;
const telegraf_1 = require("telegraf");
const transitsCommands_1 = require("../commands/transitsCommands");
function registerTransitsBotActions(bot) {
    const transitsMenu = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Transito per codice palina', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode)
    ]);
    bot.action('TRANSITS_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', transitsMenu);
    });
    bot.action(transitsCommands_1.TransitsCommands.GetTransitsByPoleCode, async (ctx) => {
        const myCtx = ctx;
        await myCtx.reply(transitsCommands_1.TransitsCommands.GetTransitsByPoleCode);
        myCtx.session.command = transitsCommands_1.TransitsCommands.GetTransitsByPoleCode;
    });
}
exports.registerTransitsBotActions = registerTransitsBotActions;

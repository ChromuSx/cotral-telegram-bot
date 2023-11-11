"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTransitsBotActions = void 0;
const telegraf_1 = require("telegraf");
const transitsCommands_1 = require("../../commands/transitsCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
function registerTransitsBotActions(bot) {
    const transitsMenu = telegraf_1.Markup.inlineKeyboard([
        [
            telegraf_1.Markup.button.callback('Transito per codice palina🔢', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode)
        ],
        [
            telegraf_1.Markup.button.callback('Indietro↩️', 'MAIN_MENU')
        ]
    ]);
    bot.action('TRANSITS_MENU', async (ctx) => {
        await ctx.editMessageText('Seleziona un\'opzione:', transitsMenu);
    });
    bot.action(transitsCommands_1.TransitsCommands.GetTransitsByPoleCode, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice palina:', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode);
    });
}
exports.registerTransitsBotActions = registerTransitsBotActions;

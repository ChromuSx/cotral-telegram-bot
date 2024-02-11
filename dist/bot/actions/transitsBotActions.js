"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTransitsBotActions = exports.transitsMenu = void 0;
const telegraf_1 = require("telegraf");
const transitsCommands_1 = require("../../commands/transitsCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
exports.transitsMenu = telegraf_1.Markup.keyboard([
    [
        telegraf_1.Markup.button.callback('Transito per codice palina🔢', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode)
    ],
    [
        telegraf_1.Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);
function registerTransitsBotActions(bot) {
    bot.action(transitsCommands_1.TransitsCommands.GetTransitsByPoleCode, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice palina:', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode);
    });
}
exports.registerTransitsBotActions = registerTransitsBotActions;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStopsBotActions = exports.stopsMenu = void 0;
const telegraf_1 = require("telegraf");
const stopsCommands_1 = require("../../commands/stopsCommands");
const telegrafUtils_1 = require("../../utils/telegrafUtils");
exports.stopsMenu = telegraf_1.Markup.keyboard([
    [
        telegraf_1.Markup.button.callback('Fermate per località🌐', stopsCommands_1.StopsCommands.GetStopsByLocality)
    ],
    [
        telegraf_1.Markup.button.callback('Prima fermata per località☝️🌐', stopsCommands_1.StopsCommands.GetFirstStopByLocality)
    ],
    [
        telegraf_1.Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);
function registerStopsBotActions(bot) {
    bot.action(stopsCommands_1.StopsCommands.GetStopsByLocality, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetStopsByLocality);
    });
    bot.action(stopsCommands_1.StopsCommands.GetFirstStopByLocality, async (ctx) => {
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetFirstStopByLocality);
    });
}
exports.registerStopsBotActions = registerStopsBotActions;

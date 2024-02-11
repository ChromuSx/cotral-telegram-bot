import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../../interfaces/ExtendedContext";
import { StopsCommands } from "../../commands/stopsCommands";
import { promptForInput } from "../../utils/telegrafUtils";

export const stopsMenu = Markup.keyboard([
    [
        Markup.button.callback('Fermate per località🌐', StopsCommands.GetStopsByLocality)
    ],
    [
        Markup.button.callback('Prima fermata per località☝️🌐', StopsCommands.GetFirstStopByLocality)
    ],
    [
        Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);

export function registerStopsBotActions(bot: Telegraf<ExtendedContext>) {
    bot.action(StopsCommands.GetStopsByLocality, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetStopsByLocality);
    });

    bot.action(StopsCommands.GetFirstStopByLocality, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetFirstStopByLocality);
    });
}
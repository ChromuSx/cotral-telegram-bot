import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../../interfaces/ExtendedContext";
import { StopsCommands } from "../../commands/stopsCommands";
import { promptForInput } from "../../utils/telegrafUtils";

export function registerStopsBotActions(bot: Telegraf<ExtendedContext>) {

    const stopsMenu = Markup.inlineKeyboard([
        [
            Markup.button.callback('Fermate per località🌐', StopsCommands.GetStopsByLocality)
        ],
        [
            Markup.button.callback('Prima fermata per località☝️🌐', StopsCommands.GetFirstStopByLocality)
        ],
        [
            Markup.button.callback('Indietro↩️', 'MAIN_MENU')
        ]
    ]);
    
    bot.action('STOPS_MENU', async (ctx: ExtendedContext) => {
        await ctx.editMessageText('Seleziona un\'opzione:', stopsMenu);
    });

    bot.action(StopsCommands.GetStopsByLocality, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetStopsByLocality);
    });

    bot.action(StopsCommands.GetFirstStopByLocality, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetFirstStopByLocality);
    });
}
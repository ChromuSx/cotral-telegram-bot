import { Markup } from "telegraf";
import { ExtendedContext } from "../interfaces/ExtendedContext";
import { StopsCommands } from "../commands/stopsCommands";

export function registerStopsBotActions(bot: any) {

    const stopsMenu = Markup.inlineKeyboard([
        Markup.button.callback('Fermate per località', StopsCommands.GetStopsByLocality),
        Markup.button.callback('Prima fermata per località', StopsCommands.GetFirstStopByLocality)
    ]);
    
    bot.action('STOPS_MENU', async (ctx: any) => {
        await ctx.editMessageText('Seleziona un\'opzione:', stopsMenu);
    });

    bot.action(StopsCommands.GetStopsByLocality, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = StopsCommands.GetStopsByLocality;
    });

    bot.action(StopsCommands.GetFirstStopByLocality, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = StopsCommands.GetFirstStopByLocality;
    });
}
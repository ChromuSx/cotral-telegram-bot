import { Markup } from "telegraf";
import { ExtendedContext } from "../interfaces/ExtendedContext";
import { TransitsCommands } from "../commands/transitsCommands";

export function registerTransitsBotActions(bot: any) {
    const transitsMenu = Markup.inlineKeyboard([
        Markup.button.callback('Transito per codice palina', TransitsCommands.GetTransitsByPoleCode)
    ]);
    
    bot.action('TRANSITS_MENU', async (ctx: any) => {
        await ctx.editMessageText('Seleziona un\'opzione:', transitsMenu);
    });

    bot.action(TransitsCommands.GetTransitsByPoleCode, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply(TransitsCommands.GetTransitsByPoleCode);
        myCtx.session.command = TransitsCommands.GetTransitsByPoleCode;
    });
}
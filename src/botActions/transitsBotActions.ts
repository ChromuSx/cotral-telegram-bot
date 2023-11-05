import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../interfaces/ExtendedContext";
import { TransitsCommands } from "../commands/transitsCommands";
import { promptForInput } from "../utils/telegrafUtils";

export function registerTransitsBotActions(bot: Telegraf<ExtendedContext>) {
    const transitsMenu = Markup.inlineKeyboard([
        Markup.button.callback('Transito per codice palina', TransitsCommands.GetTransitsByPoleCode)
    ]);
    
    bot.action('TRANSITS_MENU', async (ctx: ExtendedContext) => {
        await ctx.editMessageText('Seleziona un\'opzione:', transitsMenu);
    });

    bot.action(TransitsCommands.GetTransitsByPoleCode, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci il codice palina:', TransitsCommands.GetTransitsByPoleCode);
    });
}
import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../../interfaces/ExtendedContext";
import { TransitsCommands } from "../../commands/transitsCommands";
import { promptForInput } from "../../utils/telegrafUtils";

export const transitsMenu = Markup.keyboard([
    [
        Markup.button.callback('Transito per codice palina🔢', TransitsCommands.GetTransitsByPoleCode)
    ],
    [
        Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);

export function registerTransitsBotActions(bot: Telegraf<ExtendedContext>) {
    bot.action(TransitsCommands.GetTransitsByPoleCode, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci il codice palina:', TransitsCommands.GetTransitsByPoleCode);
    });
}
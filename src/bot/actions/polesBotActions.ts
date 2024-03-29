import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../../interfaces/ExtendedContext";
import { PolesCommands } from "../../commands/polesCommands";
import { promptForInput } from "../../utils/telegrafUtils";
import { handleCommand } from "../handlers/commandHandler";

export const polesMenu = Markup.keyboard([
    [
        Markup.button.callback('Preferiti✨', `poles:${PolesCommands.GetFavoritePoles}`),
        Markup.button.callback('Codice🔢', `poles:${PolesCommands.GetPolesByCode}`),
        Markup.button.callback('Posizione📍', `poles:${PolesCommands.GetPolesByPosition}`)
    ],
    [
        Markup.button.callback('Arrivo e destinazione🚶🏁', `poles:${PolesCommands.GetPoleByArrivalAndDestination}`),
        Markup.button.callback('Località di arrivo🚶', `poles:${PolesCommands.GetAllPolesDestinationsByArrival}`)
    ],
    [
        Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);

export function registerPolesBotActions(bot: Telegraf<ExtendedContext>) {
    bot.action(`poles:${PolesCommands.GetFavoritePoles}`, async (ctx: ExtendedContext) => {
        ctx.session.command = PolesCommands.GetFavoritePoles;
        await handleCommand(ctx, `/${PolesCommands.GetFavoritePoles}`);
    });

    bot.action(`poles:${PolesCommands.GetPolesByCode}`, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci il codice:', PolesCommands.GetPolesByCode);
    });

    bot.action(`poles:${PolesCommands.GetPolesByPosition}`, async (ctx: ExtendedContext) => {
        ctx.session.command = PolesCommands.GetPolesByPosition;
        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback('Usa la mia posizione attuale🛰️', 'use_current_position')
            ],
            [
                Markup.button.callback('Inserisco manualmente📎', 'enter_position_manually')
            ],
            [
                Markup.button.callback('Indietro↩️', 'POLES_MENU')
            ]
        ]);
        await ctx.editMessageText('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    });

    bot.action('use_current_position', async (ctx: ExtendedContext) => {
        await ctx.reply('Condividi la tua posizione:', Markup.keyboard([
            Markup.button.locationRequest('Condividi Posizione📍')
        ]).resize());
    });

    bot.action('enter_position_manually', async (ctx: ExtendedContext) => {
        await ctx.reply('Per favore, invia la posizione utilizzando l\'icona graffetta ("📎") e poi "Posizione".');
    });

    bot.action(`poles:${PolesCommands.GetPoleByArrivalAndDestination}`, async (ctx: ExtendedContext) => {
        ctx.session.command = PolesCommands.GetPoleByArrivalAndDestination;
        ctx.session.step = 'arrival';
        ctx.session.params = {};
        await ctx.reply(`Inserisci l'arrivo:`);
    });

    bot.action(`poles:${PolesCommands.GetAllPolesDestinationsByArrival}`, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci la località di arrivo:', PolesCommands.GetAllPolesDestinationsByArrival);
    });
}
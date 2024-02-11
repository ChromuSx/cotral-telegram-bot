import { Markup } from "telegraf";
import { PolesCommands, handleGetFavoritePoles } from "../../commands/polesCommands";
import { ActionFunction } from "../../interfaces/ExtendedContext";
import { promptForInput } from "../../utils/telegrafUtils";
import { StopsCommands } from "../../commands/stopsCommands";
import { TransitsCommands } from "../../commands/transitsCommands";
import { VehiclesCommands } from "../../commands/vehiclesCommands";
import { polesMenu } from "../actions/polesBotActions";
import { SharedCommands } from "../../commands/sharedCommands";
import { mainMenu } from "../bot";

const sharedActions: Record<string, ActionFunction> = {
    [`${SharedCommands.BackToMainMenu}`]: async ctx => { mainMenu(ctx) },
};

const polesActions: Record<string, ActionFunction> = {
    [`${PolesCommands.GetPolesMenu}`]: async ctx => { await ctx.reply('Seleziona un\'opzione:', polesMenu) },
    [`${PolesCommands.GetPolesByCodeFromMenu}`]: ctx => promptForInput(ctx, 'Inserisci il codice:', PolesCommands.GetPolesByCode),
    [`/${PolesCommands.GetPolesByCode}`]: ctx => promptForInput(ctx, 'Inserisci il codice:', PolesCommands.GetPolesByCode),
    [`${PolesCommands.GetPolesByPositionFromMenu}`]: async ctx => {
        ctx.session.command = PolesCommands.GetPolesByPosition;
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`/${PolesCommands.GetPolesByPosition}`]: async ctx => {
        ctx.session.command = PolesCommands.GetPolesByPosition;
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`${PolesCommands.GetPoleByArrivalAndDestinationFromMenu}`]: async ctx => {
        ctx.session.step = 'arrival';
        promptForInput(ctx, 'Inserisci l\'arrivo:', PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`/${PolesCommands.GetPoleByArrivalAndDestination}`]: async ctx => {
        ctx.session.step = 'arrival';
        promptForInput(ctx, 'Inserisci l\'arrivo:', PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`${PolesCommands.GetAllPolesDestinationsByArrivalFromMenu}`]: ctx => promptForInput(ctx, 'Inserisci la località di arrivo:', PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${PolesCommands.GetAllPolesDestinationsByArrivalFromMenu}`]: ctx => promptForInput(ctx, 'Inserisci la località di arrivo:', PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${PolesCommands.GetAllPolesDestinationsByArrival}`]: ctx => promptForInput(ctx, 'Inserisci la località di arrivo:', PolesCommands.GetAllPolesDestinationsByArrival),
    [`${PolesCommands.GetFavoritePolesFromMenu}`]: async (ctx, userId) => await handleGetFavoritePoles(ctx, userId),
    [`/${PolesCommands.GetFavoritePoles}`]: async (ctx, userId) => await handleGetFavoritePoles(ctx, userId)
}

const stopsActions: Record<string, ActionFunction> = {
    [`${StopsCommands.GetStopsByLocality}`]: ctx => promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetStopsByLocality),
    [`${StopsCommands.GetFirstStopByLocality}`]: ctx => promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetFirstStopByLocality)
}

const transitsActions: Record<string, ActionFunction> = {
    [`/${TransitsCommands.GetTransitsByPoleCode}`]: ctx => promptForInput(ctx, 'Inserisci il codice della palina:', TransitsCommands.GetTransitsByPoleCode)
}

const vehiclesActions: Record<string, ActionFunction> = {
    [`/${VehiclesCommands.GetVehicleRealTimePositions}`]: ctx => promptForInput(ctx, 'Inserisci il codice del veicolo:', VehiclesCommands.GetVehicleRealTimePositions)
}

export const commandActions: Record<string, ActionFunction> = {
    ...sharedActions,
    ...polesActions,
    ...stopsActions,
    ...transitsActions,
    ...vehiclesActions
};
import { Markup } from "telegraf";
import { PolesCommands } from "../../commands/polesCommands";
import * as polesApiHandler from '../../apiHandlers/polesApiHandler';
import { ActionFunction } from "../../interfaces/ExtendedContext";
import { promptForInput } from "../../utils/telegrafUtils";
import { StopsCommands } from "../../commands/stopsCommands";
import { TransitsCommands } from "../../commands/transitsCommands";
import { VehiclesCommands } from "../../commands/vehiclesCommands";

export const commandActions: Record<string, ActionFunction> = {
    [`/${PolesCommands.GetPolesByCode}`]: ctx => promptForInput(ctx, 'Inserisci il codice:', PolesCommands.GetPolesByCode),
    [`/${PolesCommands.GetPolesByPosition}`]: async ctx => {
        ctx.session.command = PolesCommands.GetPolesByPosition;
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`/${PolesCommands.GetPoleByArrivalAndDestination}`]: async ctx => {
        ctx.session.step = 'arrival';
        promptForInput(ctx, 'Inserisci l\'arrivo:', PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`/${PolesCommands.GetAllPolesDestinationsByArrival}`]: ctx => promptForInput(ctx, 'Inserisci la località di arrivo:', PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${StopsCommands.GetStopsByLocality}`]: ctx => promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetStopsByLocality),
    [`/${StopsCommands.GetFirstStopByLocality}`]: ctx => promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetFirstStopByLocality),
    [`/${TransitsCommands.GetTransitsByPoleCode}`]: ctx => promptForInput(ctx, 'Inserisci il codice della palina:', TransitsCommands.GetTransitsByPoleCode),
    [`/${VehiclesCommands.GetVehicleRealTimePositions}`]: ctx => promptForInput(ctx, 'Inserisci il codice del veicolo:', VehiclesCommands.GetVehicleRealTimePositions),
    [`/${PolesCommands.GetFavoritePoles}`]: async (ctx, userId) => {
        if (userId) {
            await polesApiHandler.getFavoritePoles(ctx, userId);
        } else {
            await ctx.reply('UserID non trovato');
        }
    }
};
import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../interfaces/ExtendedContext";
import { VehiclesCommands } from "../commands/vehiclesCommands";
import { promptForInput } from "../utils/telegrafUtils";

export function registerVehiclesBotActions(bot: Telegraf<ExtendedContext>) {
    const vehiclesMenu = Markup.inlineKeyboard([
        Markup.button.callback('Posizione veicolo per codice veicolo', VehiclesCommands.GetVehicleRealTimePositions)
    ]);
    
    bot.action('VEHICLES_MENU', async (ctx: ExtendedContext) => {
        await ctx.editMessageText('Seleziona un\'opzione:', vehiclesMenu);
    });
    
    bot.action(VehiclesCommands.GetVehicleRealTimePositions, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci il codice veicolo:', VehiclesCommands.GetVehicleRealTimePositions);
    });
}
import { Markup } from "telegraf";
import { ExtendedContext } from "../interfaces/ExtendedContext";
import { VehiclesCommands } from "../commands/vehiclesCommands";

export function registerVehiclesBotActions(bot: any) {
    const vehiclesMenu = Markup.inlineKeyboard([
        Markup.button.callback('Posizione veicolo per codice veicolo', VehiclesCommands.GetVehicleRealTimePositions)
    ]);
    
    bot.action('VEHICLES_MENU', async (ctx: any) => {
        await ctx.editMessageText('Seleziona un\'opzione:', vehiclesMenu);
    });
    
    bot.action(VehiclesCommands.GetVehicleRealTimePositions, async (ctx: any) => {
        const myCtx = ctx as ExtendedContext;
        await myCtx.reply('Inserisci codice veicolo:');
        myCtx.session.command = VehiclesCommands.GetVehicleRealTimePositions;
    });
}
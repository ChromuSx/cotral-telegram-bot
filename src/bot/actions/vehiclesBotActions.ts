import { Markup, Telegraf } from "telegraf";
import { ExtendedContext } from "../../interfaces/ExtendedContext";
import { VehiclesCommands } from "../../commands/vehiclesCommands";
import { promptForInput } from "../../utils/telegrafUtils";

const vehiclesMenu = Markup.keyboard([
    [
        Markup.button.callback('Posizione veicolo per codice veicolo🔢', VehiclesCommands.GetVehicleRealTimePositions)
    ],
    [
        Markup.button.callback('Menù principale↩️', 'MAIN_MENU')
    ]
]);

export function registerVehiclesBotActions(bot: Telegraf<ExtendedContext>) {
    bot.action(VehiclesCommands.GetVehicleRealTimePositions, async (ctx: ExtendedContext) => {
        promptForInput(ctx, 'Inserisci il codice veicolo:', VehiclesCommands.GetVehicleRealTimePositions);
    });
}
import { MyContext } from "../interfaces/MyContext";

export function registerVehiclesBotActions(bot: any) {

    bot.action('getVehicleRealTimePositions', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Inserisci codice veicolo:');
        myCtx.session.command = 'getVehicleRealTimePositions';
    });
}
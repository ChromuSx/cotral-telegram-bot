import { MyContext } from "../interfaces/MyContext";

export function registerTransitsBotActions(bot: any) {

    bot.action('getTransitsByPoleCode', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Inserisci codice palina:');
        myCtx.session.command = 'getTransitsByPoleCode';
    });
}
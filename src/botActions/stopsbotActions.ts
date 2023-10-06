import { MyContext } from "../interfaces/MyContext";

export function registerStopsBotActions(bot: any) {

    bot.action('getStopsByLocality', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = 'getStopsByLocality';
    });

    bot.action('getFirstStopByLocality', async (ctx: any) => {
        const myCtx = ctx as MyContext;
        await myCtx.reply('Inserisci la località:');
        myCtx.session.command = 'getFirstStopByLocality';
    });
}
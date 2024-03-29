import 'dotenv/config';
import { Markup, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { ExtendedContext } from '../interfaces/ExtendedContext';
import { registerPolesBotActions } from './actions/polesBotActions';
import { registerStopsBotActions } from './actions/stopsbotActions';
import { registerTransitsBotActions } from './actions/transitsBotActions';
import { registerVehiclesBotActions } from './actions/vehiclesBotActions';
import { PolesCommands } from '../commands/polesCommands';
import { StopsCommands } from '../commands/stopsCommands';
import { TransitsCommands } from '../commands/transitsCommands';
import { VehiclesCommands } from '../commands/vehiclesCommands';
import { handleCommand } from './handlers/commandHandler';
import { handleCallbackQuery } from './handlers/callbackQueryHandler';
import { handleLocation } from './handlers/locationHandler';
import { getFavoritePolesButtons } from '../apiHandlers/polesApiHandler';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (typeof token !== 'string') {
  throw new Error('TELEGRAM_BOT_TOKEN must be set in environment.');
}

const bot = new Telegraf<ExtendedContext>(token);
const localSession = new LocalSession({ database: 'session_db.json' });

bot.use(localSession.middleware('session'));

registerPolesBotActions(bot);
registerStopsBotActions(bot);
registerTransitsBotActions(bot);
registerVehiclesBotActions(bot);

async function registerCommands() {
    await bot.telegram.setMyCommands([
        { command: '/start', description: 'Avvia il bot' },
        { command: `/${PolesCommands.GetFavoritePoles}`, description: 'Ottieni le tue paline preferite' },
        { command: `/${PolesCommands.GetPolesByCode}`, description: 'Ottieni paline per codice' },
        { command: `/${PolesCommands.GetPolesByPosition}`, description: 'Ottieni paline per posizione' },
        { command: `/${PolesCommands.GetPoleByArrivalAndDestination}`, description: 'Ottieni palina per arrivo e destinazione' },
        { command: `/${PolesCommands.GetAllPolesDestinationsByArrival}`, description: 'Ottieni tutte le destinazioni per arrivo' },
        { command: `/${StopsCommands.GetStopsByLocality}`, description: 'Ottieni fermate per località' },
        { command: `/${StopsCommands.GetFirstStopByLocality}`, description: 'Ottieni prima fermata per località' },
        { command: `/${TransitsCommands.GetTransitsByPoleCode}`, description: 'Ottieni transiti per codice palina' },
        { command: `/${VehiclesCommands.GetVehicleRealTimePositions}`, description: 'Ottieni posizione veicolo per codice veicolo' },
    ]);
}

registerCommands();

const welcomeMessage = 'Benvenuto! 👋\nPer accedere ai servizi, seleziona una delle opzioni qui sotto 👇\n oppure usa le scorciatoie del menu per un accesso rapido. 🚀';

let mainMenuButtons = [
    [
        Markup.button.callback('Paline🪧', 'POLES_MENU'),
        Markup.button.callback('Fermate🚏', 'STOPS_MENU')
    ],
    [
        Markup.button.callback('Transiti🚦', 'TRANSITS_MENU'),
        Markup.button.callback('Veicoli🚎', 'VEHICLES_MENU')
    ]
];

let mainMenuButtonsWithFavoritePoles: any = [];

bot.start(ctx => {
    mainMenu(ctx);
});


bot.action('MAIN_MENU', ctx => {
    mainMenu(ctx);
});


export async function mainMenu(ctx: ExtendedContext) {
    const favoritePolesButtons = await getFavoritePolesButtons(ctx);

    const favoritePolesInlineKeyboard = Markup.inlineKeyboard(
        favoritePolesButtons.map(button => Markup.button.callback(button.text, button.callback_data)),
        { columns: favoritePolesButtons.length > 1 ? 2 : 1 } // Opzionale: definisci il numero di colonne
    );

    await ctx.reply(welcomeMessage, Markup.keyboard(mainMenuButtons));

    if (favoritePolesButtons.length > 0) {
        await ctx.reply('Le tue paline preferite:', favoritePolesInlineKeyboard);
    }
}


bot.on('text', async (ctx) => {
    const myCtx = ctx as ExtendedContext;
    const text = ctx.message?.text;
    await handleCommand(myCtx, text);
});

bot.on('location', async (ctx) => {
    await handleLocation(ctx);
});

bot.on('callback_query', async (ctx) => {
    await handleCallbackQuery(ctx);
});

export default bot;

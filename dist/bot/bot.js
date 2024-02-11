"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
require("dotenv/config");
const telegraf_1 = require("telegraf");
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const polesBotActions_1 = require("./actions/polesBotActions");
const stopsbotActions_1 = require("./actions/stopsbotActions");
const transitsBotActions_1 = require("./actions/transitsBotActions");
const vehiclesBotActions_1 = require("./actions/vehiclesBotActions");
const polesCommands_1 = require("../commands/polesCommands");
const stopsCommands_1 = require("../commands/stopsCommands");
const transitsCommands_1 = require("../commands/transitsCommands");
const vehiclesCommands_1 = require("../commands/vehiclesCommands");
const commandHandler_1 = require("./handlers/commandHandler");
const callbackQueryHandler_1 = require("./handlers/callbackQueryHandler");
const locationHandler_1 = require("./handlers/locationHandler");
const polesApiHandler_1 = require("../apiHandlers/polesApiHandler");
const token = process.env.TELEGRAM_BOT_TOKEN;
if (typeof token !== 'string') {
    throw new Error('TELEGRAM_BOT_TOKEN must be set in environment.');
}
const bot = new telegraf_1.Telegraf(token);
const localSession = new telegraf_session_local_1.default({ database: 'session_db.json' });
bot.use(localSession.middleware('session'));
(0, polesBotActions_1.registerPolesBotActions)(bot);
(0, stopsbotActions_1.registerStopsBotActions)(bot);
(0, transitsBotActions_1.registerTransitsBotActions)(bot);
(0, vehiclesBotActions_1.registerVehiclesBotActions)(bot);
async function registerCommands() {
    await bot.telegram.setMyCommands([
        { command: '/start', description: 'Avvia il bot' },
        { command: `/${polesCommands_1.PolesCommands.GetFavoritePoles}`, description: 'Ottieni le tue paline preferite' },
        { command: `/${polesCommands_1.PolesCommands.GetPolesByCode}`, description: 'Ottieni paline per codice' },
        { command: `/${polesCommands_1.PolesCommands.GetPolesByPosition}`, description: 'Ottieni paline per posizione' },
        { command: `/${polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination}`, description: 'Ottieni palina per arrivo e destinazione' },
        { command: `/${polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival}`, description: 'Ottieni tutte le destinazioni per arrivo' },
        { command: `/${stopsCommands_1.StopsCommands.GetStopsByLocality}`, description: 'Ottieni fermate per località' },
        { command: `/${stopsCommands_1.StopsCommands.GetFirstStopByLocality}`, description: 'Ottieni prima fermata per località' },
        { command: `/${transitsCommands_1.TransitsCommands.GetTransitsByPoleCode}`, description: 'Ottieni transiti per codice palina' },
        { command: `/${vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions}`, description: 'Ottieni posizione veicolo per codice veicolo' },
    ]);
}
registerCommands();
const welcomeMessage = 'Benvenuto! 👋\nPer accedere ai servizi, seleziona una delle opzioni qui sotto 👇\n oppure usa le scorciatoie del menu per un accesso rapido. 🚀';
let mainMenuButtons = [
    [
        telegraf_1.Markup.button.callback('Paline🪧', 'POLES_MENU'),
        telegraf_1.Markup.button.callback('Fermate🚏', 'STOPS_MENU')
    ],
    [
        telegraf_1.Markup.button.callback('Transiti🚦', 'TRANSITS_MENU'),
        telegraf_1.Markup.button.callback('Veicoli🚎', 'VEHICLES_MENU')
    ]
];
let mainMenuButtonsWithFavoritePoles = [];
bot.start(ctx => {
    mainMenu(ctx);
});
bot.action('MAIN_MENU', ctx => {
    mainMenu(ctx);
});
async function mainMenu(ctx) {
    const favoritePolesButtons = await (0, polesApiHandler_1.getFavoritePolesButtons)(ctx);
    const favoritePolesInlineKeyboard = telegraf_1.Markup.inlineKeyboard(favoritePolesButtons.map(button => telegraf_1.Markup.button.callback(button.text, button.callback_data)), { columns: favoritePolesButtons.length > 1 ? 2 : 1 } // Opzionale: definisci il numero di colonne
    );
    await ctx.reply(welcomeMessage, telegraf_1.Markup.keyboard(mainMenuButtons));
    if (favoritePolesButtons.length > 0) {
        await ctx.reply('Le tue paline preferite:', favoritePolesInlineKeyboard);
    }
}
exports.mainMenu = mainMenu;
bot.on('text', async (ctx) => {
    const myCtx = ctx;
    const text = ctx.message?.text;
    await (0, commandHandler_1.handleCommand)(myCtx, text);
});
bot.on('location', async (ctx) => {
    await (0, locationHandler_1.handleLocation)(ctx);
});
bot.on('callback_query', async (ctx) => {
    await (0, callbackQueryHandler_1.handleCallbackQuery)(ctx);
});
exports.default = bot;

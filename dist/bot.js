"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const polesCommands = __importStar(require("./apiHandlers/polesApiHandler"));
const stopsCommands = __importStar(require("./apiHandlers/stopsApiHandler"));
const transitsCommands = __importStar(require("./apiHandlers/transitsApiHandler"));
const vehiclesCommands = __importStar(require("./apiHandlers/vehiclesApiHandler"));
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const polesBotActions_1 = require("./botActions/polesBotActions");
const stopsbotActions_1 = require("./botActions/stopsbotActions");
const transitsBotActions_1 = require("./botActions/transitsBotActions");
const vehiclesBotActions_1 = require("./botActions/vehiclesBotActions");
const polesCommands_1 = require("./commands/polesCommands");
const stopsCommands_1 = require("./commands/stopsCommands");
const transitsCommands_1 = require("./commands/transitsCommands");
const vehiclesCommands_1 = require("./commands/vehiclesCommands");
const telegrafUtils_1 = require("./utils/telegrafUtils");
const bot = new telegraf_1.Telegraf('5961534596:AAEa7wTXZX4XEG0B-gd-XPvjxoVFglkBtCk');
const localSession = new telegraf_session_local_1.default({ database: 'session_db.json' });
bot.use(localSession.middleware('session'));
bot.use((ctx, next) => {
    const myCtx = ctx;
    return next();
});
(0, polesBotActions_1.registerPolesBotActions)(bot);
(0, stopsbotActions_1.registerStopsBotActions)(bot);
(0, transitsBotActions_1.registerTransitsBotActions)(bot);
(0, vehiclesBotActions_1.registerVehiclesBotActions)(bot);
async function sendMessage(ctx, message) {
    await ctx.reply(message);
}
async function handleErrors(ctx, error) {
    console.error('Errore:', error);
    await ctx.reply('Si è verificato un errore, riprova più tardi.');
}
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
const commandActions = {
    [`/${polesCommands_1.PolesCommands.GetPolesByCode}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice:', polesCommands_1.PolesCommands.GetPolesByCode),
    [`/${polesCommands_1.PolesCommands.GetPolesByPosition}`]: async (ctx) => {
        ctx.session.command = polesCommands_1.PolesCommands.GetPolesByPosition;
        const keyboard = telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            telegraf_1.Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`/${polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination}`]: async (ctx) => {
        ctx.session.step = 'arrival';
        (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci l\'arrivo:', polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`/${polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località di arrivo:', polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${stopsCommands_1.StopsCommands.GetStopsByLocality}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetStopsByLocality),
    [`/${stopsCommands_1.StopsCommands.GetFirstStopByLocality}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci la località:', stopsCommands_1.StopsCommands.GetFirstStopByLocality),
    [`/${transitsCommands_1.TransitsCommands.GetTransitsByPoleCode}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice della palina:', transitsCommands_1.TransitsCommands.GetTransitsByPoleCode),
    [`/${vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions}`]: ctx => (0, telegrafUtils_1.promptForInput)(ctx, 'Inserisci il codice del veicolo:', vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions),
    [`/${polesCommands_1.PolesCommands.GetFavoritePoles}`]: async (ctx, userId) => {
        if (userId) {
            await polesCommands.getFavoritePoles(ctx, userId);
        }
        else {
            await sendMessage(ctx, 'UserID non trovato');
        }
    }
};
const sessionActions = {
    [polesCommands_1.PolesCommands.GetPolesByCode]: async (ctx, text, userId) => await polesCommands.getPolesByCode(ctx, text, { userId }),
    [polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination]: async (ctx, text) => {
        if (ctx.session.step === 'arrival') {
            ctx.session.params.arrival = text;
            ctx.session.step = 'destination';
            await ctx.reply(`Inserisci la destinazione:`);
        }
        else if (ctx.session.step === 'destination') {
            ctx.session.params.destination = text;
            await polesCommands.getPoleByArrivalAndDestinationLocality(ctx, ctx.session.params);
            ctx.session.command = undefined;
            ctx.session.step = undefined;
            ctx.session.params = {};
        }
    },
    [polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival]: async (ctx, text) => await polesCommands.getAllPolesDestinationsByArrivalLocality(ctx, text),
    [stopsCommands_1.StopsCommands.GetStopsByLocality]: async (ctx, text) => await stopsCommands.getStopsByLocality(ctx, text),
    [stopsCommands_1.StopsCommands.GetFirstStopByLocality]: async (ctx, text) => await stopsCommands.getFirstStopByLocality(ctx, text),
    [transitsCommands_1.TransitsCommands.GetTransitsByPoleCode]: async (ctx, text) => await transitsCommands.getTransitsByPoleCode(ctx, text),
    [vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions]: async (ctx, text) => await vehiclesCommands.getVehicleRealTimePositions(ctx, text),
};
async function handleCommand(myCtx, text) {
    try {
        const userId = myCtx.from?.id;
        const commandAction = commandActions[text];
        const sessionAction = myCtx.session.command ? sessionActions[myCtx.session.command] : undefined;
        if (commandAction) {
            await commandAction(myCtx, userId);
        }
        else if (sessionAction) {
            await sessionAction(myCtx, text, userId);
        }
        else {
            await sendMessage(myCtx, 'Comando non riconosciuto');
        }
    }
    catch (error) {
        handleErrors(myCtx, error);
    }
}
const mainMenu = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback('Paline', 'POLES_MENU'),
    telegraf_1.Markup.button.callback('Fermate', 'STOPS_MENU'),
    telegraf_1.Markup.button.callback('Transiti', 'TRANSITS_MENU'),
    telegraf_1.Markup.button.callback('Veicoli', 'VEHICLES_MENU'),
]);
bot.start((ctx) => {
    ctx.reply('Benvenuto, seleziona un\'opzione:', mainMenu);
});
bot.on('text', async (ctx) => {
    const myCtx = ctx;
    const text = ctx.message?.text;
    await handleCommand(myCtx, text);
});
bot.on('location', async (ctx) => {
    const myCtx = ctx;
    if (myCtx.session.command === polesCommands_1.PolesCommands.GetPolesByPosition) {
        const latitude = ctx.message?.location?.latitude;
        const longitude = ctx.message?.location?.longitude;
        if (latitude && longitude) {
            await polesCommands.getPolesByPosition(myCtx, { latitude, longitude });
            myCtx.session.command = undefined;
        }
        else {
            await sendMessage(ctx, 'Posizione non valida');
        }
    }
});
bot.on('callback_query', async (ctx) => {
    if ('data' in ctx.callbackQuery) {
        const callbackData = ctx.callbackQuery.data;
        const [contextAction, action, firstArgument, secondArgument] = callbackData.split(':');
        const userId = ctx.from?.id;
        if (contextAction === 'transits' && firstArgument) {
            if (action === 'getTransits') {
                await transitsCommands.getTransitsByPoleCode(ctx, firstArgument);
            }
        }
        else if (contextAction === 'poles') {
            if (userId) {
                if (action === 'add_favorite') {
                    if (firstArgument && secondArgument) {
                        await polesCommands.addFavoritePole(ctx, firstArgument, secondArgument, userId);
                    }
                }
                else if (action === 'remove_favorite') {
                    if (firstArgument) {
                        await polesCommands.removeFavoritePole(ctx, firstArgument, userId);
                    }
                }
                else if (action === polesCommands_1.PolesCommands.GetFavoritePoles) {
                    await polesCommands.getFavoritePoles(ctx, userId);
                }
            }
            else {
                await sendMessage(ctx, 'UserID non trovato');
            }
        }
    }
});
exports.default = bot;

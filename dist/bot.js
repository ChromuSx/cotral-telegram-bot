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
const polesCommands = __importStar(require("./commands/polesCommands"));
const stopsCommands = __importStar(require("./commands/stopsCommands"));
const transitsCommands = __importStar(require("./commands/transitsCommands"));
const vehiclesCommands = __importStar(require("./commands/vehiclesCommands"));
const telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
const polesBotActions_1 = require("./botActions/polesBotActions");
const stopsbotActions_1 = require("./botActions/stopsbotActions");
const transitsBotActions_1 = require("./botActions/transitsBotActions");
const vehiclesBotActions_1 = require("./botActions/vehiclesBotActions");
const bot = new telegraf_1.Telegraf('6607824270:AAEutzYyOLNKJ7Vh77vaeF33wetpwvPQiv8');
const localSession = new telegraf_session_local_1.default({ database: 'session_db.json' });
bot.use(localSession.middleware('session'));
bot.use((ctx, next) => {
    const myCtx = ctx;
    return next();
});
var Command;
(function (Command) {
    Command["GetPolesByCode"] = "getpolesbycode";
    Command["GetPolesByPosition"] = "getpolesbyposition";
    Command["GetPoleByArrivalAndDestination"] = "getpolebyarrivalanddestination";
    Command["GetAllPolesDestinationsByArrival"] = "getallpolesdestinationsbyarrival";
    Command["GetStopsByLocality"] = "getStopsByLocality";
    Command["GetFirstStopByLocality"] = "getFirstStopByLocality";
    Command["GetTransitsByPoleCode"] = "getTransitsByPoleCode";
    Command["GetVehicleRealTimePositions"] = "getVehicleRealTimePositions";
})(Command || (Command = {}));
(0, polesBotActions_1.registerPolesBotActions)(bot);
(0, stopsbotActions_1.registerStopsBotActions)(bot);
(0, transitsBotActions_1.registerTransitsBotActions)(bot);
(0, vehiclesBotActions_1.registerVehiclesBotActions)(bot);
async function sendMessage(ctx, message) {
    await ctx.reply(message);
}
async function handleErrors(ctx, error) {
    console.error('Errore:', error);
}
async function handleCommand(myCtx, text) {
    try {
        switch (myCtx.session.command) {
            case Command.GetPolesByCode:
                await polesCommands.getPolesByCode(myCtx, text);
                myCtx.session.command = undefined;
                break;
            case Command.GetPoleByArrivalAndDestination:
                if (myCtx.session.step === 'arrival') {
                    myCtx.session.params.arrival = text;
                    myCtx.session.step = 'destination';
                    await myCtx.reply(`Inserisci la destinazione:`);
                }
                else if (myCtx.session.step === 'destination') {
                    myCtx.session.params.destination = text;
                    await polesCommands.getPoleByArrivalAndDestinationLocality(myCtx, myCtx.session.params);
                    myCtx.session.command = undefined;
                    myCtx.session.step = undefined;
                    myCtx.session.params = {};
                }
                break;
            case Command.GetAllPolesDestinationsByArrival:
                await polesCommands.getAllPolesDestinationsByArrivalLocality(myCtx, text);
                myCtx.session.command = undefined;
                break;
            case Command.GetStopsByLocality:
                await stopsCommands.getStopsByLocality(myCtx, text);
                myCtx.session.command = undefined;
                break;
            case Command.GetFirstStopByLocality:
                await stopsCommands.getFirstStopByLocality(myCtx, text);
                myCtx.session.command = undefined;
                break;
            case Command.GetTransitsByPoleCode:
                await transitsCommands.getTransitsByPoleCode(myCtx, text);
                myCtx.session.command = undefined;
                break;
            case Command.GetVehicleRealTimePositions:
                await vehiclesCommands.getVehicleRealTimePositions(myCtx, text);
                myCtx.session.command = undefined;
                break;
            default:
                await sendMessage(myCtx, 'Comando non riconosciuto');
        }
    }
    catch (error) {
        handleErrors(myCtx, error);
    }
}
bot.start((ctx) => {
    const welcomeMessage = 'Benvenuto cerca paline per:';
    const keyboard = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Codice', Command.GetPolesByCode),
        telegraf_1.Markup.button.callback('Posizione', Command.GetPolesByPosition),
        telegraf_1.Markup.button.callback('Arrivo e destinazione', Command.GetPoleByArrivalAndDestination),
        telegraf_1.Markup.button.callback('Località di arrivo', Command.GetAllPolesDestinationsByArrival),
        telegraf_1.Markup.button.callback('Fermate per località', Command.GetStopsByLocality),
        telegraf_1.Markup.button.callback('Prima fermata per località', Command.GetFirstStopByLocality),
        telegraf_1.Markup.button.callback('Transito per codice palina', Command.GetTransitsByPoleCode),
        telegraf_1.Markup.button.callback('Posizione veicolo per codice veicolo', Command.GetVehicleRealTimePositions)
    ]);
    ctx.reply(welcomeMessage, keyboard);
});
bot.on('text', async (ctx) => {
    const myCtx = ctx;
    const text = ctx.message?.text;
    await handleCommand(myCtx, text);
});
bot.on('location', async (ctx) => {
    const myCtx = ctx;
    if (myCtx.session.command === Command.GetPolesByPosition) {
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
exports.default = bot;

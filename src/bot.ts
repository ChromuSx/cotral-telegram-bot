import { Context, Markup, Telegraf } from 'telegraf';
import * as polesCommands from './apiHandlers/polesApiHandler';
import * as stopsCommands from './apiHandlers/stopsApiHandler';
import * as transitsCommands from './apiHandlers/transitsApiHandler';
import * as vehiclesCommands from './apiHandlers/vehiclesApiHandler';
import LocalSession from 'telegraf-session-local';
import { ActionFunction, ExtendedContext } from './interfaces/ExtendedContext';
import { registerPolesBotActions } from './botActions/polesBotActions';
import { registerStopsBotActions } from './botActions/stopsbotActions';
import { registerTransitsBotActions } from './botActions/transitsBotActions';
import { registerVehiclesBotActions } from './botActions/vehiclesBotActions';
import { PolesCommands } from './commands/polesCommands';
import { StopsCommands } from './commands/stopsCommands';
import { TransitsCommands } from './commands/transitsCommands';
import { VehiclesCommands } from './commands/vehiclesCommands';
import { promptForInput } from './utils/telegrafUtils';

const bot = new Telegraf('5961534596:AAEa7wTXZX4XEG0B-gd-XPvjxoVFglkBtCk');
const localSession = new LocalSession({ database: 'session_db.json' });

bot.use(localSession.middleware('session'));
bot.use((ctx, next) => {
    const myCtx = ctx as ExtendedContext;
    return next();
});

registerPolesBotActions(bot);
registerStopsBotActions(bot);
registerTransitsBotActions(bot);
registerVehiclesBotActions(bot);

async function sendMessage(ctx: Context, message: string) {
    await ctx.reply(message);
}

async function handleErrors(ctx: Context, error: unknown) {
    console.error('Errore:', error);
    await ctx.reply('Si è verificato un errore, riprova più tardi.');
}

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

const commandActions: Record<string, ActionFunction> = {
    [`/${PolesCommands.GetPolesByCode}`]: ctx => promptForInput(ctx, 'Inserisci il codice:', PolesCommands.GetPolesByCode),
    [`/${PolesCommands.GetPolesByPosition}`]: async ctx => {
        ctx.session.command = PolesCommands.GetPolesByPosition;
        const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Usa la mia posizione attuale', 'use_current_position'),
            Markup.button.callback('Inserisco manualmente', 'enter_position_manually'),
        ]);
        await ctx.reply('Vuoi usare la tua posizione attuale o inserire una posizione manualmente?', keyboard);
    },
    [`/${PolesCommands.GetPoleByArrivalAndDestination}`]: async ctx => {
        ctx.session.step = 'arrival';
        promptForInput(ctx, 'Inserisci l\'arrivo:', PolesCommands.GetPoleByArrivalAndDestination);
    },
    [`/${PolesCommands.GetAllPolesDestinationsByArrival}`]: ctx => promptForInput(ctx, 'Inserisci la località di arrivo:', PolesCommands.GetAllPolesDestinationsByArrival),
    [`/${StopsCommands.GetStopsByLocality}`]: ctx => promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetStopsByLocality),
    [`/${StopsCommands.GetFirstStopByLocality}`]: ctx => promptForInput(ctx, 'Inserisci la località:', StopsCommands.GetFirstStopByLocality),
    [`/${TransitsCommands.GetTransitsByPoleCode}`]: ctx => promptForInput(ctx, 'Inserisci il codice della palina:', TransitsCommands.GetTransitsByPoleCode),
    [`/${VehiclesCommands.GetVehicleRealTimePositions}`]: ctx => promptForInput(ctx, 'Inserisci il codice del veicolo:', VehiclesCommands.GetVehicleRealTimePositions),
    [`/${PolesCommands.GetFavoritePoles}`]: async (ctx, userId) => {
        if (userId) {
            await polesCommands.getFavoritePoles(ctx, userId);
        } else {
            await sendMessage(ctx, 'UserID non trovato');
        }
    }
};

const sessionActions: Record<string, (ctx: ExtendedContext, text: string, userId?: number) => void> = {
    [PolesCommands.GetPolesByCode]: async (ctx, text, userId) => await polesCommands.getPolesByCode(ctx, text, { userId }),
    [PolesCommands.GetPoleByArrivalAndDestination]: async (ctx, text) => {
        if (ctx.session.step === 'arrival') {
            ctx.session.params.arrival = text;
            ctx.session.step = 'destination';
            await ctx.reply(`Inserisci la destinazione:`);
        } else if (ctx.session.step === 'destination') {
            ctx.session.params.destination = text;
            await polesCommands.getPoleByArrivalAndDestinationLocality(ctx, ctx.session.params);
            ctx.session.command = undefined;
            ctx.session.step = undefined;
            ctx.session.params = {};
        }
    },
    [PolesCommands.GetAllPolesDestinationsByArrival]: async (ctx, text) => await polesCommands.getAllPolesDestinationsByArrivalLocality(ctx, text),
    [StopsCommands.GetStopsByLocality]: async (ctx, text) => await stopsCommands.getStopsByLocality(ctx, text),
    [StopsCommands.GetFirstStopByLocality]: async (ctx, text) => await stopsCommands.getFirstStopByLocality(ctx, text),
    [TransitsCommands.GetTransitsByPoleCode]: async (ctx, text) => await transitsCommands.getTransitsByPoleCode(ctx, text),
    [VehiclesCommands.GetVehicleRealTimePositions]: async (ctx, text) => await vehiclesCommands.getVehicleRealTimePositions(ctx, text),
};

async function handleCommand(myCtx: ExtendedContext, text: string) {
    try {
        const userId = myCtx.from?.id;
        const commandAction = commandActions[text];
        const sessionAction = myCtx.session.command ? sessionActions[myCtx.session.command] : undefined;

        if (commandAction) {
            await commandAction(myCtx, userId);
        } else if (sessionAction) {
            await sessionAction(myCtx, text, userId);
        } else {
            await sendMessage(myCtx, 'Comando non riconosciuto');
        }
    } catch (error) {
        handleErrors(myCtx, error);
    }
}


const mainMenu = Markup.inlineKeyboard([
    Markup.button.callback('Paline', 'POLES_MENU'),
    Markup.button.callback('Fermate', 'STOPS_MENU'),
    Markup.button.callback('Transiti', 'TRANSITS_MENU'),
    Markup.button.callback('Veicoli', 'VEHICLES_MENU'),
]);

bot.start((ctx) => {
    ctx.reply('Benvenuto, seleziona un\'opzione:', mainMenu);
});

bot.on('text', async (ctx) => {
    const myCtx = ctx as ExtendedContext;
    const text = ctx.message?.text;
    await handleCommand(myCtx, text);
});

bot.on('location', async (ctx) => {
    const myCtx = ctx as ExtendedContext;
    if (myCtx.session.command === PolesCommands.GetPolesByPosition) {
        const latitude = ctx.message?.location?.latitude;
        const longitude = ctx.message?.location?.longitude;
        if (latitude && longitude) {
            await polesCommands.getPolesByPosition(myCtx, { latitude, longitude });
            myCtx.session.command = undefined;
        } else {
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
        } else if (contextAction === 'poles') {
            if (userId) {
                if (action === 'add_favorite') {
                    if (firstArgument && secondArgument) {
                        await polesCommands.addFavoritePole(ctx, firstArgument, secondArgument, userId);
                    }
                } else if (action === 'remove_favorite') {
                    if (firstArgument) {
                        await polesCommands.removeFavoritePole(ctx, firstArgument, userId);
                    }
                } else if (action === PolesCommands.GetFavoritePoles) {
                    await polesCommands.getFavoritePoles(ctx, userId);
                }
            } else {
                await sendMessage(ctx, 'UserID non trovato');
            }
        }
    }
});



export default bot;

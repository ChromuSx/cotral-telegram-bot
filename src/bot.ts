import { Context, Markup, Telegraf } from 'telegraf';
import * as polesCommands from './commands/polesCommands';
import * as stopsCommands from './commands/stopsCommands';
import * as transitsCommands from './commands/transitsCommands';
import * as vehiclesCommands from './commands/vehiclesCommands';
import LocalSession from 'telegraf-session-local';
import { MyContext } from './interfaces/MyContext';
import { registerPolesBotActions } from './botActions/polesBotActions';
import { registerStopsBotActions } from './botActions/stopsbotActions';
import { registerTransitsBotActions } from './botActions/transitsBotActions';
import { registerVehiclesBotActions } from './botActions/vehiclesBotActions';

const bot = new Telegraf('6607824270:AAEutzYyOLNKJ7Vh77vaeF33wetpwvPQiv8');
const localSession = new LocalSession({ database: 'session_db.json' });

bot.use(localSession.middleware('session'));
bot.use((ctx, next) => {
    const myCtx = ctx as MyContext;
    return next();
});

enum Command {
    GetPolesByCode = 'getpolesbycode',
    GetPolesByPosition = 'getpolesbyposition',
    GetPoleByArrivalAndDestination = 'getpolebyarrivalanddestination',
    GetAllPolesDestinationsByArrival = 'getallpolesdestinationsbyarrival',
    GetStopsByLocality = 'getStopsByLocality',
    GetFirstStopByLocality = 'getFirstStopByLocality',
    GetTransitsByPoleCode = 'getTransitsByPoleCode',
    GetVehicleRealTimePositions = 'getVehicleRealTimePositions'
}

registerPolesBotActions(bot);
registerStopsBotActions(bot);
registerTransitsBotActions(bot);
registerVehiclesBotActions(bot);

async function sendMessage(ctx: Context, message: string) {
    await ctx.reply(message);
}

async function handleErrors(ctx: Context, error: unknown) {
    console.error('Errore:', error);
}

async function handleCommand(myCtx: MyContext, text: string) {
    try {
        switch (myCtx.session.command) {
            case Command.GetPolesByCode:
                await polesCommands.getPolesByCode(myCtx, text);
                myCtx.session.command = undefined;
                break;
            case Command.GetPoleByArrivalAndDestination:
                if (myCtx.session.step === 'arrival') {
                    myCtx.session.params.arrival = text!;
                    myCtx.session.step = 'destination';
                    await myCtx.reply(`Inserisci la destinazione:`);
                } else if (myCtx.session.step === 'destination') {
                    myCtx.session.params.destination = text!;
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

const polesMenu = Markup.inlineKeyboard([
    Markup.button.callback('Codice', Command.GetPolesByCode),
    Markup.button.callback('Posizione', Command.GetPolesByPosition),
    Markup.button.callback('Arrivo e destinazione', Command.GetPoleByArrivalAndDestination),
    Markup.button.callback('Località di arrivo', Command.GetAllPolesDestinationsByArrival)
]);

const stopsMenu = Markup.inlineKeyboard([
    Markup.button.callback('Fermate per località', Command.GetStopsByLocality),
    Markup.button.callback('Prima fermata per località', Command.GetFirstStopByLocality)
]);

const transitsMenu = Markup.inlineKeyboard([
    Markup.button.callback('Transito per codice palina', Command.GetTransitsByPoleCode)
]);

const vehiclesMenu = Markup.inlineKeyboard([
    Markup.button.callback('Posizione veicolo per codice veicolo', Command.GetVehicleRealTimePositions)
]);

bot.action('POLES_MENU', async (ctx) => {
    await ctx.editMessageText('Seleziona un\'opzione:', polesMenu);
});

bot.action('STOPS_MENU', async (ctx) => {
    await ctx.editMessageText('Seleziona un\'opzione:', stopsMenu);
});

bot.action('TRANSITS_MENU', async (ctx) => {
    await ctx.editMessageText('Seleziona un\'opzione:', transitsMenu);
});

bot.action('VEHICLES_MENU', async (ctx) => {
    await ctx.editMessageText('Seleziona un\'opzione:', vehiclesMenu);
});

bot.start((ctx) => {
    ctx.reply('Benvenuto, seleziona un\'opzione:', mainMenu);
});

bot.on('text', async (ctx: any) => {
    const myCtx = ctx as MyContext;
    const text = ctx.message?.text;
    await handleCommand(myCtx, text);
});

bot.on('location', async (ctx: any) => {
    const myCtx = ctx as MyContext;
    if (myCtx.session.command === Command.GetPolesByPosition) {
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

export default bot;

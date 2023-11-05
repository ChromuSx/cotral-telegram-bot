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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionActions = void 0;
const polesApiHandler = __importStar(require("../../apiHandlers/polesApiHandler"));
const stopsApiHandler = __importStar(require("../../apiHandlers/stopsApiHandler"));
const transitsApiHandler = __importStar(require("../../apiHandlers/transitsApiHandler"));
const vehiclesApiHandler = __importStar(require("../../apiHandlers/vehiclesApiHandler"));
const polesCommands_1 = require("../../commands/polesCommands");
const stopsCommands_1 = require("../../commands/stopsCommands");
const vehiclesCommands_1 = require("../../commands/vehiclesCommands");
const transitsCommands_1 = require("../../commands/transitsCommands");
exports.sessionActions = {
    [polesCommands_1.PolesCommands.GetPolesByCode]: async (ctx, text, userId) => await polesApiHandler.getPolesByCode(ctx, text, { userId }),
    [polesCommands_1.PolesCommands.GetPoleByArrivalAndDestination]: async (ctx, text) => {
        if (ctx.session.step === 'arrival') {
            ctx.session.params.arrival = text;
            ctx.session.step = 'destination';
            await ctx.reply(`Inserisci la destinazione:`);
        }
        else if (ctx.session.step === 'destination') {
            ctx.session.params.destination = text;
            await polesApiHandler.getPoleByArrivalAndDestinationLocality(ctx, ctx.session.params);
            ctx.session.command = undefined;
            ctx.session.step = undefined;
            ctx.session.params = {};
        }
    },
    [polesCommands_1.PolesCommands.GetAllPolesDestinationsByArrival]: async (ctx, text) => await polesApiHandler.getAllPolesDestinationsByArrivalLocality(ctx, text),
    [stopsCommands_1.StopsCommands.GetStopsByLocality]: async (ctx, text) => await stopsApiHandler.getStopsByLocality(ctx, text),
    [stopsCommands_1.StopsCommands.GetFirstStopByLocality]: async (ctx, text) => await stopsApiHandler.getFirstStopByLocality(ctx, text),
    [transitsCommands_1.TransitsCommands.GetTransitsByPoleCode]: async (ctx, text) => await transitsApiHandler.getTransitsByPoleCode(ctx, text),
    [vehiclesCommands_1.VehiclesCommands.GetVehicleRealTimePositions]: async (ctx, text) => await vehiclesApiHandler.getVehicleRealTimePositions(ctx, text),
};

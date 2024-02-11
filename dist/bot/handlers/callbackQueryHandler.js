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
exports.handleCallbackQuery = void 0;
const polesApiHandler = __importStar(require("../../apiHandlers/polesApiHandler"));
const transitsApiHandler = __importStar(require("../../apiHandlers/transitsApiHandler"));
const vehiclesApiHandler = __importStar(require("../../apiHandlers/vehiclesApiHandler"));
const polesCommands_1 = require("../../commands/polesCommands");
async function handleCallbackQuery(ctx) {
    if ('data' in ctx.callbackQuery) {
        const callbackData = ctx.callbackQuery.data;
        const [contextAction, action, firstArgument, secondArgument] = callbackData.split(':');
        const userId = ctx.from?.id;
        if (contextAction === 'transits' && firstArgument) {
            if (action === 'getTransits') {
                await transitsApiHandler.getTransitsByPoleCode(ctx, firstArgument);
            }
        }
        else if (contextAction === 'poles') {
            if (userId) {
                if (action === 'add_favorite') {
                    if (firstArgument && secondArgument) {
                        await polesApiHandler.addFavoritePole(ctx, firstArgument, secondArgument, userId);
                    }
                }
                else if (action === 'remove_favorite') {
                    if (firstArgument) {
                        await polesApiHandler.removeFavoritePole(ctx, firstArgument, userId);
                    }
                }
                else if (action === polesCommands_1.PolesCommands.GetFavoritePoles) {
                    await polesApiHandler.getFavoritePoles(ctx, userId);
                }
            }
            else {
                await ctx.reply('UserID non trovato');
            }
        }
        else if (contextAction === 'vehicles' && firstArgument) {
            if (action === 'getVehicleRealTimePositions') {
                await vehiclesApiHandler.getVehicleRealTimePositions(ctx, firstArgument);
            }
        }
    }
}
exports.handleCallbackQuery = handleCallbackQuery;

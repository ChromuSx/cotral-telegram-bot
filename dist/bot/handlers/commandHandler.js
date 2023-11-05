"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommand = void 0;
const commandActions_1 = require("../actions/commandActions");
const sessionActions_1 = require("../actions/sessionActions");
const errorHandler_1 = require("./errorHandler");
async function handleCommand(ctx, text) {
    try {
        const userId = ctx.from?.id;
        const commandAction = commandActions_1.commandActions[text];
        const sessionAction = ctx.session.command ? sessionActions_1.sessionActions[ctx.session.command] : undefined;
        if (commandAction) {
            await commandAction(ctx, userId);
        }
        else if (sessionAction) {
            await sessionAction(ctx, text, userId);
        }
        else {
            await ctx.reply('Comando non riconosciuto');
        }
    }
    catch (error) {
        (0, errorHandler_1.handleErrors)(ctx, error);
    }
}
exports.handleCommand = handleCommand;

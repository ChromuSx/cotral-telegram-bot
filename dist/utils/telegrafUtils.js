"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForInput = void 0;
async function promptForInput(ctx, message, sessionProperty) {
    await ctx.reply(message);
    ctx.session.command = sessionProperty;
}
exports.promptForInput = promptForInput;

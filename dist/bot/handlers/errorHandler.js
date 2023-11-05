"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
async function handleErrors(ctx, error) {
    console.error('Errore:', error);
    await ctx.reply('Si è verificato un errore, riprova più tardi.');
}
exports.handleErrors = handleErrors;

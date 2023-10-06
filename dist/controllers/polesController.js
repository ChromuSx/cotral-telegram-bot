"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPolesByCode = void 0;
const axiosService_1 = __importDefault(require("../services/axiosService"));
async function getPolesByCode(ctx) {
    if ('text' in ctx.message) {
        const args = ctx.message.text.split(' ');
        if (args && args.length === 2) {
            const stopCode = args[1];
            try {
                const response = await axiosService_1.default.get(`/poles/${stopCode}`);
                ctx.reply(JSON.stringify(response.data));
            }
            catch (error) {
                ctx.reply('Si è verificato un errore durante il recupero dei dati');
            }
        }
        else {
            ctx.reply('Per favore, fornisci un codice di fermata valido.');
        }
    }
}
exports.getPolesByCode = getPolesByCode;

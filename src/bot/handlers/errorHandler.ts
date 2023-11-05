import { Context } from "telegraf";

export async function handleErrors(ctx: Context, error: unknown) {
    console.error('Errore:', error);
    await ctx.reply('Si è verificato un errore, riprova più tardi.');
}
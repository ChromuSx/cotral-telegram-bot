import { NarrowedContext } from 'telegraf';
import * as polesApiHandler from '../../apiHandlers/polesApiHandler';
import * as transitsApiHandler from '../../apiHandlers/transitsApiHandler';
import { PolesCommands } from '../../commands/polesCommands';
import { ExtendedContext } from '../../interfaces/ExtendedContext';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';

export async function handleCallbackQuery(ctx:  NarrowedContext<ExtendedContext, Update.CallbackQueryUpdate<CallbackQuery>>) {
    if ('data' in ctx.callbackQuery) {
        const callbackData = ctx.callbackQuery.data;
        const [contextAction, action, firstArgument, secondArgument] = callbackData.split(':');

        const userId = ctx.from?.id;

        if (contextAction === 'transits' && firstArgument) {
            if (action === 'getTransits') {
                await transitsApiHandler.getTransitsByPoleCode(ctx, firstArgument);
            }
        } else if (contextAction === 'poles') {
            if (userId) {
                if (action === 'add_favorite') {
                    if (firstArgument && secondArgument) {
                        await polesApiHandler.addFavoritePole(ctx, firstArgument, secondArgument, userId);
                    }
                } else if (action === 'remove_favorite') {
                    if (firstArgument) {
                        await polesApiHandler.removeFavoritePole(ctx, firstArgument, userId);
                    }
                } else if (action === PolesCommands.GetFavoritePoles) {
                    await polesApiHandler.getFavoritePoles(ctx, userId);
                }
            } else {
                await ctx.reply('UserID non trovato');
            }
        }
    }
}
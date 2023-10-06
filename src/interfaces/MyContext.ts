import { Context } from "telegraf";
import { UserSession } from "./UserSession";

export interface MyContext extends Context {
    session: UserSession;
}
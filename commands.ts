// Now you can remove these two imports in bot.ts!
import { SlashCommandPartial, SlashCommandOptionType } from "./deps.ts";

export const commands: SlashCommandPartial[] = [
  {
    name: "ping",
    description: "Pong!",
    options: [],
  },
];

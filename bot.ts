import {
  event,
  CommandClient,
  command,
  CommandContext,
  GatewayIntents,
} from "./deps.ts";

class MyClient extends CommandClient {
  constructor() {
    super({
      prefix: ["!", "!!"],
      caseSensitive: false,
    });
  }

  @event()
  ready(): void {
    console.log(`Logged in as ${this.user?.tag}!`);
  }

  @command({ aliases: "pong" })
  Ping(ctx: CommandContext): void {
    ctx.message.reply("Pong!");
  }
}

new MyClient().connect("super secret token comes here", [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);

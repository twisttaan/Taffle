import {
  event,
  CommandClient,
  command,
  CommandContext,
  GatewayIntents,
  Interaction,
  slash,
} from "./deps.ts";

import * as config from "./config.ts";
import { commands } from "./commands.ts";

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
    // change bots status
    this.user?.client.setPresence({
      // set presence
      activity: {
        name: "myself",
        type: "LISTENING",
      },
    });
    // slashys
    commands.forEach((command) => {
      // If you want to create command globally, just remove 'Your Server/Guild ID' part
      // I recommend making it for only one guild for now because Global Slash Commands can take max 1 hour to come live.
      this.slash.commands
        .create(command, "901426442242498650")
        .then((cmd) => console.log(`Created Slash Command ${cmd.name}!`))
        .catch((cmd) => console.log(`Failed to create ${cmd.name} command!`));
    });
  }

  @slash()
  ping(i: Interaction) {
    i.respond({
      content: "Pong!",
    });
  }

  // get the current time and send it as an embed
  @command({ aliases: "time" })
  Time(ctx: CommandContext): void {
    const time = new Date();
    ctx.message.channel.send({
      embed: {
        title: "Time",
        description: `${time.toLocaleString()}`,
        color: 0x00ff00,
      },
    });
  }

  // get the current world population and send it as an embed
  @command({ aliases: "cstats" })
  async Cstats(ctx: CommandContext): Promise<void> {
    const response = await fetch("https://api.covid19api.com/world/total");
    const json = response.json();
    json.then((data: { TotalConfirmed: number; TotalDeaths: number }) => {
      const totalConfirmedFormatted = new Intl.NumberFormat("en-US").format(
        data.TotalConfirmed
      );
      const totalDeathsFormatted = new Intl.NumberFormat("en-US").format(
        data.TotalDeaths
      );
      ctx.message.channel.send({
        embed: {
          title: "Covid Stats",
          fields: [
            { name: "Total Confirmed", value: totalConfirmedFormatted },
            { name: "Total Deaths", value: totalDeathsFormatted },
          ],
          color: 0x00ff00,
        },
      });
    });
  }

  // get a random image of a dog and send it
  @command({ aliases: "dog" })
  async Dog(ctx: CommandContext): Promise<void> {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = response.json();
    json.then((data: { message: string }) => {
      ctx.message.channel.send(data.message);
    });
  }

  // send the current guilds image
  @command({ aliases: "gimg" })
  GuildImage(ctx: CommandContext): void {
    ctx.message.channel.send(ctx.guild?.iconURL());
  }

  // say how many boosts the current server has
  @command({ aliases: "boosts" })
  Boosts(ctx: CommandContext): void {
    ctx.message.channel.send(
      `This server has ${ctx.guild?.premiumSubscriptionCount} boosts`
    );
  }

  // send the amount of covid cases
  @command({ aliases: "covid" })
  async Covid(ctx: CommandContext): Promise<void> {
    const response = await fetch("https://covid19.mathdro.id/api");
    const json = response.json();
    json.then((data: { confirmed: { value: number } }) => {
      const confirmedFormatted = new Intl.NumberFormat("en-US").format(
        data.confirmed.value
      );
      ctx.message.channel.send(
        `There are ${confirmedFormatted} confirmed cases`
      );
    });
  }

  // send a rocket to space
  @command({ aliases: "rocket" })
  Rocket(ctx: CommandContext): void {
    ctx.message.channel.send("????");
  }

  // send a random picture of a goose
  @command({ aliases: "goose" })
  async Goose(ctx: CommandContext): Promise<void> {
    const response = await fetch("https://random-d.uk/api/v1/random");
    const json = response.json();
    json.then((data: { url: string }) => {
      ctx.message.channel.send(data.url);
    });
  }

  // say a random your mom joke
  @command({ aliases: "joke" })
  async Joke(ctx: CommandContext): Promise<void> {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const json = response.json();
    json.then((data: { joke: string }) => {
      ctx.message.channel.send(data.joke);
    });
  }

  // spam the current channel with emojis
  @command({ aliases: "emojis" })
  Emojis(ctx: CommandContext): void {
    const emojis = ["????", "????", "????", "????", "????", "????", "????", "????", "????"];
    emojis.forEach((emoji) => {
      ctx.message.channel.send(emoji);
    });
  }

  // send random cctv footage
  @command({ aliases: "cctv" }) // this was me testing copilot as i just got it, and was testing what random apis i could find
  async Cctv(ctx: CommandContext): Promise<void> {
    const response = await fetch("https://random.dog/woof.json");
    const json = response.json();
    json.then((data: { url: string }) => {
      ctx.message.channel.send(data.url);
    });
  }
}

new MyClient().connect(config.config.token, [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);

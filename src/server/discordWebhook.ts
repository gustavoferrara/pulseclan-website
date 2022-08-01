import 'dotenv-safe/config';

import { MessageEmbed, WebhookClient } from 'discord.js';

interface DsMessageBody {
  title: string;
  description: string;
  url: string;
}

const sendDiscordMessage = async (body: DsMessageBody) => {
  const webhookClient = new WebhookClient({
    url: body.url,
  });

  const embed = new MessageEmbed()
    .setTitle(body.title)
    .setDescription(body.description)
    .setColor('#ffe200');

  await webhookClient.send({
    embeds: [embed],
  });
};

export default sendDiscordMessage;

import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('cuddle')
        .setDescription('Send some cozy cuddles to a Kitty 🫂🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to cuddle')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `🫂🐈‍⬛ ${target} has been wrapped in a **BIG COZY CUDDLE!** 💜`,
            `🐈‍⬛💜 Booboo has activated **Maximum Cuddle Mode** for ${target}.`,
            `🫂✨ ${target} is now safely contained within the cuddle zone.`,
            `🐾💜 *wraps ${target} in a giant blanket burrito*`,
            `🌙🫂 ${target} has received emergency cuddles. Everything is okay now.`,
            `🐈‍⬛🖤 Booboo cuddles ${target}. No thoughts. Just cozy.`,
            `🧸💜 ${target} has been captured by the **Cuddle Beam™**.`,
            `🫂🐈‍⬛ Cuddle delivery complete! ${target} is officially cozy.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🫂🐈‍⬛ BOOBOO CUDDLE DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

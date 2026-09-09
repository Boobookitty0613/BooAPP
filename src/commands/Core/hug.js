import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Send a virtual hug to a Kitty 🫂🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to hug')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `🫂🐈‍⬛ ${target} has been wrapped in a **BIG BOOBOO HUG!** 💜`,
            `💜🫂 Booboo has deployed emergency cuddles for ${target}.`,
            `🐈‍⬛🖤 ${target} has received a warm, squishy hug. No escape. 🤗`,
            `🫂✨ HUG DELIVERY! ${target} has been hugged successfully.`,
            `🐾💜 ${target} has been caught in the **Cuddle Beam™**.`,
            `🖤🐈‍⬛ Booboo says ${target} deserves a hug. And Booboo is always right.`,
            `🫂🌙 A soft little hug has been delivered to ${target}. You are safe in the Lair.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🫂🐈‍⬛ BOOBOO HUG DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

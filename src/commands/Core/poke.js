import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('poke')
        .setDescription('Poke a Kitty for absolutely no reason 👉🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to poke')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `👉🐈‍⬛ *poke* ${target}.`,
            `👈👀 ${target} has been poked. Booboo refuses to explain why.`,
            `🐈‍⬛👉 *poke poke* ${target}... Are you alive?`,
            `💜👉 ${target} has been selected for a **VERY IMPORTANT POKE.**`,
            `👁️👁️👉 ${target}... *poke*`,
            `🐾👉 Booboo pokes ${target} and immediately runs away.`,
            `💀👉 ${target} has been poked. This was completely necessary.`,
            `🐈‍⬛💜 *aggressive poking* ${target} has no idea what is happening.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '👉🐈‍⬛ BOOBOO POKE DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

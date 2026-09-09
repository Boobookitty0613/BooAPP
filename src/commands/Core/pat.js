import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Give a Kitty some head pats 🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to pat')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `🐈‍⬛💜 *pat pat* ${target} has received some wholesome head pats.`,
            `🖤🐾 Booboo gently pats ${target} on the head. Good Kitty.`,
            `🐈‍⬛✨ ${target} has been awarded **Head Pats™**. Congratulations.`,
            `💜🐈‍⬛ *pat pat pat pat* ${target} is now 37% more emotionally supported.`,
            `🫳🐈‍⬛ Booboo gives ${target} a gentle little pat. There, there. 💜`,
            `🐾🖤 ${target} has entered the **Patting Zone™**. Escape is impossible.`,
            `🐈‍⬛💀 ${target} has been patted. Booboo has decided you are worthy.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🐈‍⬛💜 HEAD PAT DELIVERY 💜🐈‍⬛',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

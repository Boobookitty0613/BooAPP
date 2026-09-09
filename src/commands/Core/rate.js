import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription('Let Booboo give a Kitty a completely accurate rating ⭐🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to rate')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const ratings = [
            ['Chaos', Math.floor(Math.random() * 101)],
            ['Gothness', Math.floor(Math.random() * 101)],
            ['Gremlin Energy', Math.floor(Math.random() * 101)],
            ['Gamer Energy', Math.floor(Math.random() * 101)],
            ['Kitty-ness', Math.floor(Math.random() * 101)],
            ['Silliness', Math.floor(Math.random() * 101)],
        ];

        const rating = ratings[Math.floor(Math.random() * ratings.length)];

        let verdict;

        if (rating[1] >= 90) {
            verdict = '💀 Absolutely feral. Booboo is concerned.';
        } else if (rating[1] >= 75) {
            verdict = '🐈‍⬛💜 Impressive levels of nonsense. Booboo approves.';
        } else if (rating[1] >= 50) {
            verdict = '👀 Respectable. Could use more chaos.';
        } else if (rating[1] >= 25) {
            verdict = '🫠 A little suspicious, but acceptable.';
        } else {
            verdict = '🐈‍⬛💀 Booboo has questions.';
        }

        const embed = createEmbed({
            title: '⭐🐈‍⬛ BOOBOO’S TOTALLY ACCURATE RATING 💜',
            description:
                `**${target}** has been scientifically evaluated!\n\n` +
                `📊 **${rating[0]}:** **${rating[1]}/100**\n\n` +
                verdict,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

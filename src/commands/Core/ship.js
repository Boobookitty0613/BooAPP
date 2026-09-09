import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Let Booboo calculate two Kitty Crew members’ compatibility 💕🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user1')
                .setDescription('First Kitty')
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName('user2')
                .setDescription('Second Kitty')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');

        const compatibility = Math.floor(Math.random() * 101);

        let verdict;

        if (compatibility >= 90) {
            verdict = '💍 BOOBOO HAS SEEN THE FUTURE. IT IS CHAOTICALLY ROMANTIC.';
        } else if (compatibility >= 75) {
            verdict = '💕 The vibes are VERY suspicious. Booboo approves.';
        } else if (compatibility >= 50) {
            verdict = '👀 There might be something here... or Booboo is just bored.';
        } else if (compatibility >= 25) {
            verdict = '💀 The chemistry is questionable. Proceed with caution.';
        } else {
            verdict = '🐈‍⬛💥 Booboo has officially declared this a skill issue.';
        }

        const embed = createEmbed({
            title: '💕🐈‍⬛ BOOBOO’S LOVE LAB 💜',
            description:
                `**${user1}** 💜 **${user2}**\n\n` +
                `🔬 **Totally Scientific Compatibility:** **${compatibility}%**\n\n` +
                verdict,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

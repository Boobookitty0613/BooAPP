import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask Booboo the all-knowing chaos cat a question 🔮🐈‍⬛')
        .addStringOption(option =>
            option
                .setName('question')
                .setDescription('Ask Booboo anything')
                .setRequired(true)
        ),

    async execute(interaction) {
        const question = interaction.options.getString('question');

        const responses = [
            '🔮🐈‍⬛ Absolutely. Booboo has spoken.',
            '💀 No. Absolutely not. Next question.',
            '🐈‍⬛💜 Booboo says **maybe**. She refuses to elaborate.',
            '👁️👁️ The answer is hidden in the forbidden basement.',
            '🤨 Ask again when you have more brain cells.',
            '💜🐾 Yes. Trust the cat.',
            '🦇🔮 The spirits say **probably**.',
            '🐈‍⬛💀 Booboo has considered your question and chosen chaos.',
            '🎱✨ The vibes are suspiciously good.',
            '😭 The answer is... **skill issue.**',
            '🌙🐈‍⬛ Not even Booboo knows. And she knows EVERYTHING.',
            '💀🔮 Signs point to **absolutely cursed**.',
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🎱🐈‍⬛ BOOBOO KNOWS ALL 💜',
            description: `**Question:** ${question}\n\n🔮 **Booboo says:**\n${response}`,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

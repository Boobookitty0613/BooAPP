import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription('Boop someone. What could possibly go wrong? 🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to boop')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `🐈‍⬛👉 ${target} has been BOOPED. There is no appeal process.`,
            `💜🐾 BOOP! ${target} has been gently booped.`,
            `🐈‍⬛💥 **BOOP ATTACK!** ${target} never saw it coming.`,
            `👁️👁️ ${target} has been booped. Booboo is pleased.`,
            `🖤🐈‍⬛ *boop* ...and now we pretend nothing happened.`,
            `💀🐾 ${target} has received the forbidden boop.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🐈‍⬛💜 BOOP DELIVERY 💜🐈‍⬛',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

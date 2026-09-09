import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a Kitty with ✨friendship✨ 🐈‍⬛💥')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to slap')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `🐈‍⬛💥 **SLAP!** ${target} has been gently slapped with ✨friendship✨.`,
            `👋💀 Booboo has slapped ${target}. This was completely necessary.`,
            `🐾💥 **BONK'S EVIL TWIN HAS ARRIVED.** ${target} has been slapped.`,
            `🐈‍⬛👋 ${target} has been slapped. Booboo refuses to explain.`,
            `💜💀 *SLAP!* ${target} has learned a valuable lesson. Probably.`,
            `👋🐈‍⬛ ${target} looked too peaceful. **SLAP.**`,
            `💥🐾 Booboo delivers a perfectly unnecessary slap to ${target}.`,
            `🐈‍⬛💀 ${target} has been slapped into another dimension.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '👋🐈‍⬛ BOOBOO SLAP DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

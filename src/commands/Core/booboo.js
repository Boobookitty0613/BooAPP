import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('booboo')
        .setDescription('Summon Booboo the chaos cat 🐈‍⬛'),

    async execute(interaction) {
        try {
            const responses = [
                '🐈‍⬛💜 Mrrrp! You summoned Booboo. What do you want, human?',
                '🐈‍⬛🖤 Booboo has arrived. Please keep your hands and feet inside the Lair.',
                '👁️👁️ You called?',
                '🐈‍⬛✨ Booboo is watching you. She is judging you. She is also probably hungry.',
                '🦇🐈‍⬛ The forbidden cat has been summoned. CHAOS INCOMING.',
                '💜🐾 Booboo says: You are legally required to have a good day now.',
                '🐈‍⬛💀 Booboo has entered the chat. Everyone act normal.',
                '🖤🐈‍⬛ *aggressive cat noises*',
            ];

            const response = responses[Math.floor(Math.random() * responses.length)];

            const embed = createEmbed({
                title: '🐈‍⬛💜 BOOBOO HAS ARRIVED 💜🐈‍⬛',
                description: response,
            });

            await InteractionHelper.safeReply(interaction, {
                embeds: [embed],
            });

        } catch (error) {
            logger.error('Booboo command error:', error);

            await InteractionHelper.safeReply(interaction, {
                content: '🐈‍⬛💀 Booboo encountered a skill issue.',
            }).catch(() => {});
        }
    },
};

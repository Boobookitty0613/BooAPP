import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('yeet')
        .setDescription('Yeet a Kitty into the void 💀🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to yeet')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `💀🐈‍⬛ **YEET!** ${target} has been launched into the void.`,
            `🚀🐾 Booboo has yeeted ${target}. There is no coming back.`,
            `🐈‍⬛💥 ${target} has been YEETED at unsafe speeds.`,
            `👋💀 Booboo gently picks up ${target} and **YEETS.**`,
            `🚀🐈‍⬛ ${target} has left the Lair. Please allow 3–5 business days for return.`,
            `💜💀 ${target} asked for peace. Booboo responded with **YEET.**`,
            `🐾🚀 **YEET PROTOCOL ACTIVATED.** ${target} has achieved flight.`,
            `👁️👁️ ${target} has been yeeted. Booboo will not be answering questions.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🚀🐈‍⬛ BOOBOO YEET DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('bonk')
        .setDescription('Bonk a Kitty who has been naughty 🔨🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty who needs a bonk')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `🔨🐈‍⬛ **BONK!** ${target} has been bonked. Please behave.`,
            `💀🔨 Booboo bonks ${target} directly into the shadow realm.`,
            `🐈‍⬛🔨 ${target} has received the **BONK OF JUSTICE™**.`,
            `👁️👁️ ${target} did something suspicious. **BONK.**`,
            `🔨💜 Booboo gently bonks ${target}. This is your warning.`,
            `🐈‍⬛💥 **MEGA BONK!** ${target} has been sent flying.`,
            `💀🐾 ${target} has been bonked. Booboo refuses to elaborate.`,
            `🔨🐈‍⬛ *bonk* ...There. Problem solved.`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '🔨🐈‍⬛ BOOBOO BONK DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

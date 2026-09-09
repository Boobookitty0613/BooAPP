import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName('highfive')
        .setDescription('Give a Kitty a high five ✋🐈‍⬛')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The Kitty you want to high five')
                .setRequired(true)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user');

        const responses = [
            `✋🐈‍⬛ **HIGH FIVE!** ${target} has been high-fived!`,
            `💜✋ ${target} and Booboo have achieved **MAXIMUM HIGH FIVE POWER!**`,
            `🐾✋ *SLAP!* A successful high five has been delivered to ${target}.`,
            `🐈‍⬛✨ ${target} gets a high five! Kitty Crew teamwork! 💜`,
            `✋💥 **MEGA HIGH FIVE!** ${target} was NOT prepared.`,
            `💀✋ Booboo attempted a high five with ${target}... Nailed it. Probably.`,
            `🐈‍⬛✋ *high five noises* ${target} has been blessed.`,
            `👋🐾 ${target} has received a certified Booboo high five.™`,
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = createEmbed({
            title: '✋🐈‍⬛ HIGH FIVE DELIVERY 💜',
            description: response,
        });

        await InteractionHelper.safeReply(interaction, {
            embeds: [embed],
        });
    },
};

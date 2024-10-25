const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role-remove")
        .setDescription("Removed a role from a user.")
        .addUserOption(option => option.setName("user").setDescription("User to remove role from.").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role to remove.").setRequired(true)),
        
    async execute(client, interaction) {
        if(!interaction.member.permissions.has("MANAGE_ROLES")) {
return interaction.reply({ content: "❌ This command requires \`manageRoles\` permission.", ephemeral: true });
}
        const user = interaction.options.getUser("user");
        const role = interaction.options.getRole("role");
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) {
            return interaction.reply({ content: "User not found in the guild.", ephemeral: true });
        }

const embed = new MessageEmbed()
.setDescription(`✅ Changed role for ${user.username}, **-${role.name}**`)
.setColor("#00ff1e");

        try {
            await member.roles.remove(role);
            return interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error giving the role. Please check my permissions and try again.", ephemeral: true });
        }
    }
};

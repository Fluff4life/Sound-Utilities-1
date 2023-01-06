const { readdirSync } = require("fs");

const config = require("../config.json")
const ascii = require("ascii-table");
let table = new ascii("Commands");
const functions = require("../functions");
const { id } = require("common-tags");
const { ReactionUserManager } = require("discord.js");
table.setHeading("Command", "Load status");
console.log("Welcome to HANDLER SERVICE // By https://x10-gaming.eu/service/dc // Discord: Tomato#6966".brightYellow)
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Ready');
            } else {
                table.addRow(file, `error -> missing a cmd.name, or cmd.name is not a string.`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}
const { Client } = require("discord.js");
const Ticket = require("../settings/models/ticket.js");
const Member = require("../settings/models/member.js");
const DarkAuction = require("../settings/models/darkauction.js");
const config = require("../settings/default.js");
  
  /**
   *
   * @param {Client} client
   */
module.exports = async (client) => {

    client.CreateAndUpdate = async function (guild_id, mention_id) {
        const newuser = await Member.findOne({ guild_id: guild_id, user_id: mention_id });
        if (!newuser) {
            const newDatabase = await new Member({
                guild_id: guild_id,
                user_id: mention_id,
                work_cooldown: 0,
                work_cooldown_time: config.general.work_cooldown_time,
                work_multiple: config.general.work_multiple,
                money: config.general.start_money,
                bank: 0,
                rob: false,
                rob_cooldown: 0,
                rob_cooldown_time: config.general.rob_cooldown_time,
                crime_cooldown: 0,
                crime_cooldown_time: config.general.crime_cooldown_time,
                crime_multiple: config.general.crime_multiple,
                vote_cooldown: 0,
                vote_cooldown_time: config.general.vote_cooldown_time,
                married_to: "",
                married: false,
                rank: "Newbie",
                reputation: 0,
            });
            await newDatabase.save();
        }

        const ticket = await Ticket.findOne({ guild_id: guild_id, user_id: mention_id });
        if (!ticket) {
            const newTicket = await new Ticket({
                guild_id: guild_id,
                user_id: mention_id,
                gacha_cooldown: 0,
                gacha_cooldown_time: 2,
                common_ticket: 0,
                uncommon_ticket: 0,
                rare_ticket: 0,
                epic_ticket: 0,
                legendary_ticket: 0,
                mythical_ticket: 0,
                guarantee_leg: 0,
                guarantee_myth: 0,
            });
            await newTicket.save();
        }
    };

    client.AuctionCreateAndUpdate = async function (guildId) {
        const auction = await DarkAuction.findOne({ guild_id: guildId });
        if (!auction) {
            const newAuction = await new DarkAuction({
                guild_id: guildId,
                enabled: false,
                channel_id: "",
                message_id: "",
                item: "",
                price: 0,
                old_price: 0,
                bidder: "",
                ended: true,
                history: [],
            });
            await newAuction.save();
        }
    }
}
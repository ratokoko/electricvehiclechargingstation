// initialize discord client
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require('./secret.json');

const fs = require('fs');

client.once('ready', () => {
    console.log("ready");

    // set status
    client.user.setActivity("evcshelp", { type: "PLAYING" });
});

client.on('messageCreate', message => {
    // if the message wasn't sent by a bot
    if (!message.author.bot) {
        if (message.content == "evcshelp") {
            message.reply("evcs [state usps abbreviation];[city]");
        }
        else if (message.content.startsWith("evcs ")) {
            const search = message.content.substring(5);
            const props = search.split(";");
            
            if (props.length == 2) {
                const state = props[0];
                const city = props[1];

                let rawdata = fs.readFileSync(`./elec_stations.json`);
                let content = JSON.parse(rawdata);
                let stuff = [];

                if (content['US'].hasOwnProperty([Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())])) {
                    if (content['US'][Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())].hasOwnProperty([Object.keys(content['US'][Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())]).find(key => key.toLowerCase() === city.toLowerCase())])) {
                        for (i = 0; i < content['US'][Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())][Object.keys(content['US'][Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())]).find(key => key.toLowerCase() === city.toLowerCase())].length; i++) {
                            stuff.push(content['US'][Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())][Object.keys(content['US'][Object.keys(content['US']).find(key => key.toLowerCase() === state.toLowerCase())]).find(key => key.toLowerCase() === city.toLowerCase())][i]);
                        }
                    } else {
                        message.reply("no data found for that city (make sure to use the city's complete name)");
                    }
                } else {
                    message.reply("no data found for that state");
                }

                if (stuff.length >= 3) {
                    var stuff2 = [];
                    for (i = 0; i < 3; i++) {
                        stuff2.push(stuff[i]);
                    }
                    message.channel.send({embeds: [
                        {
                            title: `Electric Vehicle Charging Stations in ${stuff2[0].city}, ${stuff2[0].state}`,
                            color: "#45f547",
                            image: {
                                url: "https://cdn.discordapp.com/app-icons/940015567451070464/60888a183bbf72e282879111bc80f45b.png?size=256"
                            },
                        },
                        {
                            title: `Station ${stuff2[0].station_name}`,
                            color: "#45f547",
                            thumbnail: {
                                url: "https://katv.com/resources/media/b769dbba-639b-4199-87d9-5a34c8fc2d29-large16x9_carcharger.jpg?1562172706600"
                            },
                            fields: [
                                {
                                    name: "Address",
                                    value: `: ${stuff2[0].street_address} ${stuff2[0].city}, ${stuff2[0].state} ${stuff2[0].zip_code}`,
                                    inline: true,
                                },
                                {
                                    name: "Access",
                                    value: `: ${stuff2[0].group_access} ${stuff2[0].access_time}`,
                                    inline: false,
                                },
                                {
                                    name: "Station Phone #",
                                    value: `: ${stuff2[0].station_phone_number}`,
                                    inline: true,
                                },
                                {
                                    name: "Facility",
                                    value: `: ${stuff2[0].facility_type}`,
                                    inline: true,
                                },
                                {
                                    name: "Pricing",
                                    value: `: ${stuff2[0].pricing}`,
                                    inline: true,
                                }
                            ]
                        },
                        {
                            title: `Station ${stuff2[1].station_name}`,
                            color: "#45f547",
                            thumbnail: {
                                url: "https://www.silive.com/resizer/45v45eBOvSkGl4cswwAj2otWyns=/arc-anglerfish-arc2-prod-advancelocal/public/PWGHO4PV65EKFPASO3QT2ZWUOI.jpg"
                            },
                            fields: [
                                {
                                    name: "Address",
                                    value: `: ${stuff2[1].street_address} ${stuff2[1].city}, ${stuff2[1].state} ${stuff2[1].zip_code}`,
                                    inline: true,
                                },
                                {
                                    name: "Access",
                                    value: `: ${stuff2[1].group_access} ${stuff2[1].access_time}`,
                                    inline: false,
                                },
                                {
                                    name: "Station Phone #",
                                    value: `: ${stuff2[1].station_phone_number}`,
                                    inline: true,
                                },
                                {
                                    name: "Facility",
                                    value: `: ${stuff2[1].facility_type}`,
                                    inline: true,
                                },
                                {
                                    name: "Pricing",
                                    value: `: ${stuff2[1].pricing}`,
                                    inline: true,
                                }
                            ]
                        },
                        {
                            title: `Station ${stuff2[2].station_name}`,
                            color: "#45f547",
                            thumbnail: {
                                url: "https://resources.news.e.abb.com/images/2021/9/29/1/ABB_launches_Terra_360_usecase_refueling_station_station_render_dpi.jpg"
                            },
                            fields: [
                                {
                                    name: "Address",
                                    value: `: ${stuff2[2].street_address} ${stuff2[2].city}, ${stuff2[2].state} ${stuff2[2].zip_code}`,
                                    inline: true,
                                },
                                {
                                    name: "Access",
                                    value: `: ${stuff2[2].group_access} ${stuff2[2].access_time}`,
                                    inline: false,
                                },
                                {
                                    name: "Station Phone #",
                                    value: `: ${stuff2[2].station_phone_number}`,
                                    inline: true,
                                },
                                {
                                    name: "Facility",
                                    value: `: ${stuff2[2].facility_type}`,
                                    inline: true,
                                },
                                {
                                    name: "Pricing",
                                    value: `: ${stuff2[2].pricing}`,
                                    inline: true,
                                }
                            ]
                        }
                    ]});
                } else if (stuff.length == 2) {
                    var stuff2 = [];
                    for (i = 0; i < 2; i++) {
                        stuff2.push(stuff[i]);
                    }
                    message.channel.send({embeds: [
                        {
                            title: `Electric Vehicle Charging Stations in ${stuff2[0].city}, ${stuff2[0].state}`,
                            color: "#45f547",
                            image: {
                                url: "https://cdn.discordapp.com/app-icons/940015567451070464/60888a183bbf72e282879111bc80f45b.png?size=256"
                            },
                        },
                        {
                            title: `Station ${stuff2[0].station_name}`,
                            color: "#45f547",
                            thumbnail: {
                                url: "https://katv.com/resources/media/b769dbba-639b-4199-87d9-5a34c8fc2d29-large16x9_carcharger.jpg?1562172706600"
                            },
                            fields: [
                                {
                                    name: "Address",
                                    value: `: ${stuff2[0].street_address} ${stuff2[0].city}, ${stuff2[0].state} ${stuff2[0].zip_code}`,
                                    inline: true,
                                },
                                {
                                    name: "Access",
                                    value: `: ${stuff2[0].group_access} ${stuff2[0].access_time}`,
                                    inline: false,
                                },
                                {
                                    name: "Station Phone #",
                                    value: `: ${stuff2[0].station_phone_number}`,
                                    inline: true,
                                },
                                {
                                    name: "Facility",
                                    value: `: ${stuff2[0].facility_type}`,
                                    inline: true,
                                },
                                {
                                    name: "Pricing",
                                    value: `: ${stuff2[0].pricing}`,
                                    inline: true,
                                }
                            ]
                        },
                        {
                            title: `Station ${stuff2[1].station_name}`,
                            color: "#45f547",
                            thumbnail: {
                                url: "https://www.silive.com/resizer/45v45eBOvSkGl4cswwAj2otWyns=/arc-anglerfish-arc2-prod-advancelocal/public/PWGHO4PV65EKFPASO3QT2ZWUOI.jpg"
                            },
                            fields: [
                                {
                                    name: "Address",
                                    value: `: ${stuff2[1].street_address} ${stuff2[1].city}, ${stuff2[1].state} ${stuff2[1].zip_code}`,
                                    inline: true,
                                },
                                {
                                    name: "Access",
                                    value: `: ${stuff2[1].group_access} ${stuff2[1].access_time}`,
                                    inline: false,
                                },
                                {
                                    name: "Station Phone #",
                                    value: `: ${stuff2[1].station_phone_number}`,
                                    inline: true,
                                },
                                {
                                    name: "Facility",
                                    value: `: ${stuff2[1].facility_type}`,
                                    inline: true,
                                },
                                {
                                    name: "Pricing",
                                    value: `: ${stuff2[1].pricing}`,
                                    inline: true,
                                }
                            ]
                        }
                    ]});
                } else if (stuff.length == 1) {
                    var stuff2 = [];
                    stuff2.push(stuff[0]);
                    message.channel.send({embeds: [
                        {
                            title: `Electric Vehicle Charging Stations in ${stuff2[0].city}, ${stuff2[0].state}`,
                            color: "#45f547",
                            image: {
                                url: "https://cdn.discordapp.com/app-icons/940015567451070464/60888a183bbf72e282879111bc80f45b.png?size=256"
                            },
                        },
                        {
                            title: `Station ${stuff2[0].station_name}`,
                            color: "#45f547",
                            thumbnail: {
                                url: "https://katv.com/resources/media/b769dbba-639b-4199-87d9-5a34c8fc2d29-large16x9_carcharger.jpg?1562172706600"
                            },
                            fields: [
                                {
                                    name: "Address",
                                    value: `: ${stuff2[0].street_address} ${stuff2[0].city}, ${stuff2[0].state} ${stuff2[0].zip_code}`,
                                    inline: true,
                                },
                                {
                                    name: "Access",
                                    value: `: ${stuff2[0].group_access} ${stuff2[0].access_time}`,
                                    inline: false,
                                },
                                {
                                    name: "Station Phone #",
                                    value: `: ${stuff2[0].station_phone_number}`,
                                    inline: true,
                                },
                                {
                                    name: "Facility",
                                    value: `: ${stuff2[0].facility_type}`,
                                    inline: true,
                                },
                                {
                                    name: "Pricing",
                                    value: `: ${stuff2[0].pricing}`,
                                    inline: true,
                                }
                            ]
                        }
                    ]});
                }
            }
        }
    }
});

// login discord bot
client.login(token);
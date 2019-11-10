require("dotenv").config();

const scrappity = require("scrappity");
const congressScrapper = require("./models/congress.scrapper.json");
const profileScrapper = require("./models/profile.scrapper.json");

const { connectDatabase } = require("../../models");
const { congressController } = require("./controllers");

connectDatabase()
    .then(async function(conn) {
        const scrappedCongress = (await scrappity(congressScrapper))[0][0];
        const members = await congressController.makeSense(scrappedCongress);

        const scrappedProfiles = await Promise.all(
            members.map(member => {
                const _profileScrapper = { ...profileScrapper };
                _profileScrapper.queryObjects[0].endpoint =
                    member.profileEndpoint;

                return scrappity(profileScrapper);
            })
        );
        // const scrappedProfiles = (await scrappity(profileScrapper))[0][0];
        console.log({ members, scrappedProfiles });
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });

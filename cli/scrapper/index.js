require("dotenv").config();

const mongoose = require("mongoose");
const scrappity = require("scrappity");
const congressScrapper = require("./models/congress.scrapper.json");
const profileScrapper = require("./models/profile.scrapper.json");
const partyScrapper = require("./models/parties.scrapper.json");

const { connectDatabase } = require("../../models");
const {
    congressController,
    deputyController,
    partyController
} = require("./controllers");

connectDatabase()
    .then(async function(conn) {
        if (process.env.NODE_ENV === "development") {
            try {
                const collections = await mongoose.connection.db
                    .listCollections()
                    .toArray();
                await Promise.all(
                    collections
                        .filter(
                            collection => !collection.name.startsWith("system.")
                        )
                        .map(collection =>
                            mongoose.connection
                                .collection(collection.name)
                                .drop()
                        )
                );
            } catch (error) {
                console.log(error);
            }
        }

        const scrappedCongress = (await scrappity(congressScrapper))[0][0];
        const members = await congressController.makeSense(scrappedCongress);

        const scrappedParties = (await scrappity(partyScrapper))[0][0];
        const parties = await partyController.makeSense(scrappedParties);

        const scrappedProfiles = await Promise.all(
            members.map(member => {
                const _profileScrapper = { ...profileScrapper };
                _profileScrapper.queryObjects[0].endpoint =
                    member.profileEndpoint;

                return scrappity(profileScrapper);
            })
        );

        await Promise.all(
            scrappedProfiles.map((scrappedProfile, index) => {
                return deputyController.makeSense(
                    scrappedProfile[0],
                    members[index],
                    parties,
                    index
                );
            })
        );

        console.log(`Scrapping succesfully completed! @ ${new Date()}`);
    })
    .catch(function(err) {
        console.error(
            `Scrapping could not be completed due to '${err}' @ ${new Date()}`
        );
        process.exit(1);
    });

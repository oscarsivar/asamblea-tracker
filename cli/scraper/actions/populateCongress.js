const mongoose = require("mongoose");
const scrappity = require("scrappity");

const congressScraper = require("./../models/congress.scraper.json");
const profileScraper = require("./../models/profile.scraper.json");
const partyScraper = require("./../models/parties.scraper.json");

const {
    congressController,
    deputyController,
    partyController
} = require("./../controllers");

module.exports = async function(conn) {
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
                        mongoose.connection.collection(collection.name).drop()
                    )
            );
        } catch (error) {
            console.log(error);
        }
    }

    const scrapedCongress = (await scrappity(congressScraper))[0][0];
    const { members, congress } = await congressController.makeSense(
        scrapedCongress
    );

    const scrappedParties = (await scrappity(partyScraper))[0][0];
    const parties = await partyController.makeSense(scrappedParties);

    const scrappedProfiles = await Promise.all(
        members.map(member => {
            const _profileScraper = { ...profileScraper };
            _profileScraper.queryObjects[0].endpoint = member.profileEndpoint;

            return scrappity(profileScraper);
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
};

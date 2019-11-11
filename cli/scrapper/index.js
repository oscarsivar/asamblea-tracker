require("dotenv").config();

const mongoose = require("mongoose");
const scrappity = require("scrappity");
const congressScrapper = require("./models/congress.scrapper.json");
const profileScrapper = require("./models/profile.scrapper.json");

const { connectDatabase } = require("../../models");
const { congressController, deputyController } = require("./controllers");

connectDatabase()
    .then(async function(conn) {
        if (process.env.NODE_ENV !== "production") {
            console.log({ conn });
            try {
                await Promise.all([
                    await mongoose.connection.collection("congresses").drop(),
                    await mongoose.connection.collection("deputies").drop()
                ]);
            } catch (error) {
                console.log(error);
            }
        }

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

        console.log(
            await Promise.all(
                scrappedProfiles.map((scrappedProfile, index) =>
                    deputyController.makeSense(
                        scrappedProfile[0][0],
                        members[index]
                    )
                )
            )
        );

        console.log(`Scrapping succesfully completed! @ ${new Date()}`);
    })
    .catch(function(err) {
        console.error(
            `Scrapping could not be completed due to '${err}' @ ${new Date()}`
        );
        process.exit(1);
    });

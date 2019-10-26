const scrappity = require("scrappity");
const congressScrapper = require("../defaults/congress.scrapper.json");
const profileScrapper = require("../defaults/profile.scrapper.json");

scrappity(congressScrapper)
    .then(scrappedCongress => {
        console.log({ scrappedCongress });
        scrappedCongress[0][0].map(member => {
            profileScrapper.queryObjects[0].endpoint = member.props.memberProfile.attrs.href.substring(
                1
            );
            scrappity(profileScrapper)
                .then(scrappedProfile => {
                    console.log({ scrappedProfile });
                })
                .catch(error => {
                    throw error;
                });
        });
    })
    .catch(error => {
        throw error;
    });

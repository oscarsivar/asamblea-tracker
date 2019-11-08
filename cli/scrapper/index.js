require("dotenv").config();

const { connectDatabase, models } = require("../../models");
const scrappity = require("scrappity");

connectDatabase()
    .then(async conn => {
        const { Congress } = models;

        const currentCongress = await Congress.findOne().sort();
        console.log(currentCongress);
    })
    .catch(err => {
        console.error("Not connected");
    });
// const congressScrapper = require("./models/congress.scrapper.json");
// const profileScrapper = require("./models/profile.scrapper.json");

// scrappity(congressScrapper)
//     .then(scrappedCongress => {
//         const congressMembers = scrappedCongress[0][0];
//         congressMembers.map(member => {
//             const endpoint = member.props.memberProfile.attrs.href.substring(1);
//             profileScrapper.queryObjects[0].endpoint = endpoint;
//             scrappity(profileScrapper)
//                 .then(scrappedProfile => {
//                     console.log({ scrappedProfile });
//                 })
//                 .catch(error => {
//                     throw error;
//                 });
//         });
//     })
//     .catch(error => {
//         throw error;
//     });

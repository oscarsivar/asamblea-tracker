const { models } = require("../../../models");

function congressController() {
    // At this moment, this props are static.
    // TODO: Dinamically assign values
    this.props = {
        congress: {
            slug: "2018-2021",
            nextPlenary: 101,
            lastElection: new Date(),
            nextElection: new Date(),
            periodStart: new Date(),
            periodEnd: new Date(),
        },
    };
}

congressController.prototype.fillCongress = async function (scrappedCongress) {
    try {
        const congress = await new models.Congress(this.props.congress).save();
        const members = await models.Deputy.insertMany(
            scrappedCongress.map(
                (scrapped) =>
                    new models.Deputy({
                        name: scrapped.props.memberProfile.value[0].trim(),
                        department: ":department:",
                        pictureEndpoint: scrapped.props.memberImage.attrs.src,
                        profileEndpoint:
                            scrapped.props.memberProfile.attrs.href,
                        uniqueHash: scrapped.props.memberProfile.attrs.href
                            .split("/")
                            .pop(),
                        congress: congress.id,
                    })
            )
        );

        return { members, congress };
    } catch (error) {
        throw error;
    }
};

module.exports = new congressController();

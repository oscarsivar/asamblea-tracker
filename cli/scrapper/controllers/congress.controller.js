const { models } = require("../../../models");

function congressController() {
    this.props = {
        congress: {
            lastElection: new Date(),
            nextElection: new Date(),
            periodStart: new Date(),
            periodEnd: new Date()
        }
    };
}

congressController.prototype.makeSense = async function(scrappedCongress) {
    try {
        const congress = await new models.Congress(this.props.congress).save();
        const insertedMembers = await models.Deputy.insertMany(
            scrappedCongress.map(
                scrapped =>
                    new models.Deputy({
                        name: scrapped.props.memberProfile.value[0],
                        department: ":department:",
                        pictureEndpoint: scrapped.props.memberImage.attrs.src,
                        profileEndpoint:
                            scrapped.props.memberProfile.attrs.href,
                        uniqueHash: scrapped.props.memberProfile.attrs.href
                            .split("/")
                            .pop(),
                        congress: congress.id
                    })
            )
        );
        return insertedMembers;
    } catch (error) {
        throw error;
    }
};

module.exports = new congressController();

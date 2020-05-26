const mongoose = require("mongoose");
const { models } = require("../../../models");

const RGX_PARTY_FLAG = {
    rgx: /background-image: url\((.*)\)/
};

const RGX_NUMBER_DEPUTIES = {
    rgx: /([0-9]+)/
};

function partyController() {}

partyController.prototype.fillParties = function(scrappedParties) {
    return Promise.all(
        scrappedParties
            .map(scrappedParty => {
                const { attrs: attrsImage } = scrappedParty.props.partyImage;
                const {
                    attrs: attrsHash,
                    value: valueHash
                } = scrappedParty.props.partyHash;
                return {
                    name: attrsImage.href.substring(1),
                    flag: RGX_PARTY_FLAG.rgx
                        .exec(attrsImage.style.split(";").shift())
                        .pop(),
                    hash: attrsHash.href.split("/").pop(),
                    numberDeputies: RGX_NUMBER_DEPUTIES.rgx
                        .exec(valueHash.shift())
                        .pop()
                };
            })
            .map(party =>
                new models.Party({
                    name: party.name,
                    flagEndpoint: party.flag,
                    numberDeputies: party.numberDeputies
                }).save()
            )
    );
};

module.exports = new partyController();

const { models } = require("../../../models");

const RGX_OWNER_DEPUTY = {
    rgx: /^(Diputad(?:o|a)\sPropietari(?:o|a))(?:.*[Dd]epartamento\sde\s([A-Za-z_ÑñÁáÉéÍíÓóÚú\s]+)\s*.*)?,Per[íi]odo:?\s(\w+)?\s?([0-9]{4})\s?(?:–|-)\s?(\w+)?\s?([0-9]{4})$/i,
    keys: {
        department: 2,
        period: {
            start: {
                month: 3,
                year: 4
            },
            current: {
                month: 5,
                year: 6
            }
        }
    }
};

function deputyController() {
    this._assignDepartment = (member, items) => {
        const { keys } = RGX_OWNER_DEPUTY;
        return models.Deputy.updateOne(
            { _id: member.id },
            { department: items.shift()[keys.department].trim() }
        );
    };

    this._assignSeniority = (member, items) => {
        const { keys } = RGX_OWNER_DEPUTY;
        const { month, year } = keys.period.start;

        const first = items.pop();
        const firstDate = new Date(`${first[month]} ${first[year]}`);

        return models.Deputy.updateOne(
            { _id: member.id },
            {
                numberPeriods: items.length,
                firstPeriodOn: firstDate
            }
        );
    };

    this._assignParty = (member, { flagImage, parties }) => {
        const party = parties
            .filter(party => party.flagEndpoint === flagImage.attrs.src)
            .pop();

        return models.Deputy.updateOne({ _id: member.id }, { party: party.id });
    };
}

deputyController.prototype.makeSense = function(
    profileScrapper,
    member,
    parties,
    _index
) {
    const careerEntity = profileScrapper[0][0];
    const historyItem = Array.isArray(careerEntity.props.historyItem)
        ? careerEntity.props.historyItem
        : [careerEntity.props.historyItem];

    const deputyHistory = historyItem
        .map(prop => {
            const str = prop.value.join().trim();
            const rgx = RGX_OWNER_DEPUTY.rgx.exec(str.trim());

            return rgx === null ? str : rgx;
        })
        .filter(res => Array.isArray(res));

    const partyEntity = profileScrapper[1].pop();
    const flagImage = partyEntity.props.flagImage.pop();

    return Promise.all([
        this._assignDepartment(member, [...deputyHistory]),
        this._assignSeniority(member, [...deputyHistory]),
        this._assignParty(member, { flagImage, parties })
    ]);
};

module.exports = new deputyController();

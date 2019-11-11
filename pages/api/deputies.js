import { models } from "../../models";

export default async (req, res) => {
    try {
        const deputies = await models.Deputy.find()
            .populate("party")
            .populate("congress"); // todo: need to specify a congress
        res.status(200).json(deputies);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

import { models } from "../../../models";

export default async (req, res) => {
    try {
        const deputies = await models.Deputy.find()
            .populate("party")
            .populate("congress"); // todo: need to specify a congress

        return res.status(200).json(deputies);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};

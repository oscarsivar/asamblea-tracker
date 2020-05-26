import { models } from "../../../models";

const [ATTENDANCE] = ["attendance"];

export default async (req, res) => {
    try {
        const [deputyId, endpoint] = req.query.slug;
        switch (endpoint) {
            case ATTENDANCE:
                const attendance = await models.Attendance.find({
                    deputy: deputyId,
                }).populate("plenary");
                return res.status(200).json(attendance);
            default:
                return res.status(404).json(null);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
};

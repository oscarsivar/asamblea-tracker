import { Sample } from "../../models";

export default async (req, res) => {
    const data = await Sample.find();

    res.status(200).json({ title: "NextJS 9", data });
};

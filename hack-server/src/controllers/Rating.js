import Company from "../models/Company.js";
import Rating from "../models/Rating.js";

const RatingController = {
  async add(req, res) {
    const { message, rate, CompanyId, FoundationId } = req.body;
    console.log("Request on add rating was made");
    try {
      await Rating.create({ message, rate, CompanyId, FoundationId });
      await Company.update(
        {
          averageRating:
            (await Rating.sum("rate", {
              where: { CompanyId: CompanyId },
            })) /
            (await Rating.findAndCountAll({ where: { CompanyId: CompanyId } })),
        },
        {
          where: { id: CompanyId },
        }
      );
      console.log("Rating added successfully");
      res.send();
    } catch (err) {
      console.log(err);
    }
  },
  async get(req, res) {
    const { CompanyId, FoundationId } = req.params;
    console.log("Request on get ratings was made");
    if (CompanyId) {
      const ratings = await Rating.findAll({ where: { CompanyId: CompanyId } });
      res.send(ratings);
    }
    if (FoundationId) {
      const ratings = await Rating.findAll({
        where: { FoundationId: FoundationId },
      });
      res.send(ratings);
    }
  },
};
export default RatingController;

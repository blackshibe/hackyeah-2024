import Company from "../models/Company.js";
import Foundation from "../models/Foundation.js";
import Rating from "../models/Rating.js";

const RatingController = {
  async add(req, res) {
    const { message, rate, CompanyId, FoundationId, author } = req.body;
    console.log("Request on add rating was made");
    try {
      let authorName;
      if (author === "foundation")
        authorName = await Foundation.findByPk(FoundationId);
      else authorName = await Company.findByPk(CompanyId);
      await Rating.create({
        message,
        rate,
        CompanyId,
        FoundationId,
        author,
        authorName: authorName.dataValues.name,
      });
      if (author === "foundation") {
        const { count } = await Rating.findAndCountAll({
          where: { CompanyId: CompanyId },
        });
        const sum = await Rating.sum("rate", {
          where: { CompanyId: CompanyId },
        });

        await Company.update(
          {
            averageRating: sum / count,
          },
          {
            where: { id: CompanyId },
          }
        );
      } else {
        const { count } = await Rating.findAndCountAll({
          where: { FoundationId: FoundationId },
        });
        const sum = await Rating.sum("rate", {
          where: { FoundationId: FoundationId },
        });

        await Foundation.update(
          {
            averageRating: sum / count,
          },
          {
            where: { id: FoundationId },
          }
        );
      }

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

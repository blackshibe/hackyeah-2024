import Company from "../models/Company"
import Foundation from "../models/Foundation"

const CompanyAndFoundationController = {
    async get(req, res){
        res.send([await Foundation.findAll(), await Company.findAll()]);
    }
}
export default CompanyAndFoundationController;
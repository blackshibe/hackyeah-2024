import ai from "../models/ChatGPT";
import Company from "../models/Company";
import dotenv from "dotenv";
dotenv.config();
const CompanyController = {
    async register(req, res){
        console.log("Request on register company made");
        let {name, email, country, city, target, tags, description, whoWeWant} = req.body;
        if(!description) description = await ai.description(name, target);
        if(!Array.isArray(tags)) tags = await ai.tags(name, target); 
        await Company.create({
            name: name, 
            email: email,
            country: country,
            city: city,
            target: target,
            description: description,
            tags: tags,
            whoWeWant: whoWeWant
        });
        console.log("User created successfully");
        res.send();
    },
    async get(req, res){
        const {id} = req.query;
        if(id){
            const companies = await Company.findByPk(id);
            res.send(companies);
        }else{
            const companies = await Company.findAll();
            res.send(companies);
        }
        console.log("Request on find companies made");
    }
}
export default CompanyController
import ai from "../models/ChatGPT";
import Foundation from "../models/Foundation";

const FoundationController = {
    async register(req, res){
        console.log("Request on foundation register was made");
        let {id, name, email, city, country, projects, target, tags, description} = req.body;
        if(!description) description = await ai.description(name, target);
        if(!tags) tags = await ai.tags(name, target);
        await Foundation.create({
            id, name, email, city, country, projects, target, tags, description
        })
        console.log("Foundation created successfully");
        res.send();
    }
}
export default FoundationController;
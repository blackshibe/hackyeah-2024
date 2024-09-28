import { DataTypes, Model } from "sequelize";


function initFoundationModel(sequelize){
    class Foundation extends Model {};

    Foundation.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: "Foundation"
    });
    return Foundation
}

export default initFoundationModel;
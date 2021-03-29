import {DataTypes} from "sequelize";
import {sequelize} from "../config/orm";

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false,
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

export default User
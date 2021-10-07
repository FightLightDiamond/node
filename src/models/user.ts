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
    },
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
}, {
    tableName: 'users',
    timestamps: true,
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    underscored: true,
    modelName: 'User' // We need to choose the model name
});

// User.belongsTo();
// User.hasOne();
// User.hasMany();
// User.belongsToMany( '3', {through: 'UserProject'});
// User.hasOne();
// User.hasOne();

export default User
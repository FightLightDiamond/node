import {DataTypes, Sequelize} from 'sequelize';
import config from "./config";

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log,                  // Default, displays the first parameter of the log function call
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
    // logging: false,                        // Disables logging
    // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
    // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
});


const test = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const User = sequelize.define('User', {
    // Model attributes are defined here
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

const createU = async () => {
    const jane = await User.create({ email: "Jane", password: "123" });
// Jane exists in the database now!
    console.log(jane instanceof User); // true
    if("email" in jane) {
        const {email} = jane;
        console.log(email); // "Jane"
    }
}

export {sequelize, test, createU}


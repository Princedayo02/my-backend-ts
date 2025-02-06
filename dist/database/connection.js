"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = require("path");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5431,
    username: "postgres",
    password: "root",
    database: "book_catalog",
    models: [(0, path_1.join)(__dirname, "models")],
    logging: false,
});
exports.default = sequelize;

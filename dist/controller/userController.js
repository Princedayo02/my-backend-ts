"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserbyId = exports.deleteUser = exports.addUser = exports.getUsers = void 0;
const users = [];
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "User Fetched", users });
});
exports.getUsers = getUsers;
const addUser = (req, res) => {
    const { id, name, email } = req.body;
    users.push({ id, name, email });
    res.status(200).json({ users });
};
exports.addUser = addUser;
const deleteUser = (req, res) => {
    const newUser = users.filter((user) => {
        return user.id !== req.body.id;
    });
    res.status(200).json(newUser);
};
exports.deleteUser = deleteUser;
const getUserbyId = (req, res) => {
    const id = req.body;
    console.log(id);
    const mainUser = users.find((user) => user.id === id);
    res.status(200).json(mainUser);
};
exports.getUserbyId = getUserbyId;

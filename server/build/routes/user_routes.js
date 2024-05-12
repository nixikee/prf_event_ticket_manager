"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureUserRoutes = void 0;
const User_1 = require("../model/User");
const configureUserRoutes = (router) => {
    router.get('/getAllUsers', (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/findUser', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User_1.User.findById(id);
            query.then(data => {
                console.log(data);
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.put('/updateUser', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            User_1.User.findById(id).then(data => {
                const updatedUser = data;
                if (updatedUser !== null) {
                    updatedUser.email = req.body.email;
                    updatedUser.firstname = req.body.firstname;
                    updatedUser.lastname = req.body.lastname;
                    updatedUser.nickname = req.body.nickname;
                    updatedUser.address = req.body.address;
                    updatedUser.phonenumber = req.body.phonenumber;
                    console.log(updatedUser);
                    updatedUser.save().then(data => {
                        res.status(200).send(data);
                    }).catch(error => {
                        res.status(500).send(error);
                    });
                }
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.put('/updatePassword', (req, res) => {
        if (req.isAuthenticated()) {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            const id = req.query.id;
            User_1.User.findById(id).then(data => {
                //if (oldPassword === user.password)
                data === null || data === void 0 ? void 0 : data.set('password', req.body.newPassword);
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.delete('/deleteUser', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User_1.User.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    return router;
};
exports.configureUserRoutes = configureUserRoutes;

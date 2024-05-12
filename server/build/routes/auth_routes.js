"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuthRoutes = void 0;
const User_1 = require("../model/User");
const configureAuthRoutes = (passport, router) => {
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const nickname = req.body.nickname;
        const birthdate = req.body.birthdate;
        const address = req.body.address;
        const phonenumber = req.body.phonenumber;
        const role = req.body.role;
        const password = req.body.password;
        const user = new User_1.User({ email: email, firstname: firstname, lastname: lastname, nickname: nickname,
            birthdate: birthdate, address: address, phonenumber: phonenumber, role: role, password: password });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully log out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/checkAuth', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(500).send(false);
        }
    });
    router.get('/currentUser', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(req.query.id);
        }
        else {
            res.status(401).json({ error: 'No user logged in' });
        }
    });
    return router;
};
exports.configureAuthRoutes = configureAuthRoutes;

import { Router, Request, Response } from 'express';
import { User } from '../model/User';


export const configureUserRoutes = (router: Router): Router => {

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/findUser', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.findById(id);
            query.then(data => {
                console.log(data);
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.put('/updateUser', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;

            User.findById(id).then(data => {
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
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.put('/updatePassword', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            const id = req.query.id;

            User.findById(id).then(data => {
                //if (oldPassword === user.password)
                data?.set('password', req.body.newPassword);
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            }
            )
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    return router;
};

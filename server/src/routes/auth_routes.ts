import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';


export const configureAuthRoutes = (passport: PassportStatic, router: Router): Router => {

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const nickname = req.body.nickname;
        const birthdate = req.body.birthdate;
        const address = req.body.address;
        const phonenumber = req.body.phonenumber;
        const role = req.body.role;
        const password = req.body.password;
        const user = new User({email: email, firstname: firstname, lastname: lastname, nickname: nickname, 
            birthdate: birthdate, address: address, phonenumber: phonenumber, role: role, password: password});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    
    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if(error) {
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if(err) {
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/logout', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully log out.');
            });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    router.get('/currentUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
               res.status(200).send(req.query.id);
        } else {
            res.status(401).json({ error: 'No user logged in'});
        }
    });

    return router;
};

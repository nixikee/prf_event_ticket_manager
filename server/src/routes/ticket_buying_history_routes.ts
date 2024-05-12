import { Router, Request, Response } from "express";
import { TicketBuyingHistory } from "../model/TicketBuyingHistory";

export const configureTicketBuyingHistoryRoutes = (router: Router): Router => {

    router.post('/addTicketBuyingHistory', (req: Request, res: Response) => {
        const event = JSON.parse(req.body.event);
        const user = JSON.parse(req.body.user);
        const place_count = req.body.place_count;
        const purchased_ticket_type = req.body.purchased_ticket_type;

        const ticketBuyingHistory = new TicketBuyingHistory({ event: event, user: user, place_count: place_count, 
            purchased_ticket_type: purchased_ticket_type });

        ticketBuyingHistory.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    
    router.get('/getAllTicketBuyingHistory', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const query = TicketBuyingHistory.find();
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

    router.get('/findTicketsBuyingHistory', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketBuyingHistory.findById(id);
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

    router.put('/updateTicketBuyingHistory', (req: Request, res: Response) => {
        const event = JSON.parse(req.body.event);
        const user = JSON.parse(req.body.user);
        const place_count = req.body.place_count;
        const purchased_ticket_type = req.body.purchased_ticket_type;

        const ticketBuyingHistory = new TicketBuyingHistory({ event: event, user: user, place_count: place_count,
            purchased_ticket_type: purchased_ticket_type });

        ticketBuyingHistory.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    router.delete('/deleteTicketBuyingHistory', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketBuyingHistory.deleteOne({_id: id});
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
}
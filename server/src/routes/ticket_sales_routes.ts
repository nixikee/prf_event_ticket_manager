import { Router, Request, Response } from "express";
import { TicketSales } from "../model/TicketSales";

export const configureTicketSalesRoutes = (router: Router): Router => {
    router.post('/addTicketSales', (req: Request, res: Response) => {
        const event = JSON.parse(req.body.event);
        const place_count = req.body.place_count;
        const sold_general_ticket = req.body.sold_general_ticket;
        const sold_VIP_ticket = req.body.sold_VIP_ticket;
        const sold_priority_ticket = req.body.sold_priority_ticket;
        const sold_student_ticket = req.body.sold_student_ticket;
        const sold_child_ticket = req.body.sold_child_ticket;
        const sold_retired_ticket = req.body.sold_retired_ticket;

        const ticketSales = new TicketSales({ event: event, place_count: place_count, sold_general_ticket: sold_general_ticket, 
            sold_VIP_ticket: sold_VIP_ticket, sold_priority_ticket: sold_priority_ticket, sold_student_ticket: sold_student_ticket, 
            sold_child_ticket: sold_child_ticket, sold_retired_ticket: sold_retired_ticket});

        ticketSales.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    
    router.get('/getAllTicketSales', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const query = TicketSales.find();
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

    router.get('/findTicketSales', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketSales.findById(id);
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

    router.put('/updateTicketSales', (req: Request, res: Response) => {
        const event = JSON.parse(req.body.event);
        const place_count = req.body.place_count;
        const sold_general_ticket = req.body.sold_general_ticket;
        const sold_VIP_ticket = req.body.sold_VIP_ticket;
        const sold_priority_ticket = req.body.sold_priority_ticket;
        const sold_student_ticket = req.body.sold_student_ticket;
        const sold_child_ticket = req.body.sold_child_ticket;
        const sold_retired_ticket = req.body.sold_retired_ticket;

        const ticketSales = new TicketSales({ event: event, place_count: place_count, sold_general_ticket: sold_general_ticket, 
            sold_VIP_ticket: sold_VIP_ticket, sold_priority_ticket: sold_priority_ticket, sold_student_ticket: sold_student_ticket, 
            sold_child_ticket: sold_child_ticket, sold_retired_ticket: sold_retired_ticket});

        ticketSales.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    router.delete('/deleteTicketSales', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketSales.deleteOne({_id: id});
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
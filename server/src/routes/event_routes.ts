import { Router, Request, Response } from "express";
import { Event } from "../model/Event";

export const configureEventRoutes = (router: Router): Router => {

    router.post('/addEvent', (req: Request, res: Response) => {
        const creator = JSON.parse(req.body.creator);
        const title = req.body.title;
        const startdate = req.body.startdate;
        const finishdate = req.body.finishdate;
        const location = req.body.location;
        const place_count = req.body.place_count;
        const general_ticket_price = req.body.general_ticket_price;
        const VIP_ticket_price = req.body.VIP_ticket_price;
        const priority_ticket_price = req.body.priority_ticket_price;
        const student_ticket_price = req.body.student_ticket_price;
        const child_ticket_price = req.body.child_ticket_price;
        const retired_ticket_price = req.body.retired_ticket_price;
        const image = req.body.image;
        const event = new Event({creator: creator, title: title, startdate: startdate, finishdate: finishdate,
            location: location, places_rows_count: place_count, 
            general_ticket_price: general_ticket_price, VIP_ticket_price: VIP_ticket_price, priority_ticket_price: priority_ticket_price,
            student_ticket_price: student_ticket_price, child_ticket_price: child_ticket_price, retired_ticket_price: retired_ticket_price, image: image});
        event.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    
    router.get('/getAllEvents', (req: Request, res: Response) => {

        const query = Event.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    
    });

    router.get('/findEventsByEvent', (req: Request, res: Response) => {
        const id = req.query.id;
        const query = Event.findById(id);
        query.then(data => {
            console.log(data);
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.put('/updateEvent', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            console.log(req.query.id);
            const id = req.query.id;
            const newData = req.body.data;
            event: Event;

            Event.findById(id).then(data => {
                const id = data;
                /*updatedEvent.title = req.body.title;
                updatedEvent.location = req.body.location;
                updatedEvent.startdate = req.body.startdate;
                updatedEvent.finishdate = req.body.finishdate;
                updatedEvent.places_rows_count = req.body.places_rows_count;
                updatedEvent.places_columns_count = req.body.places_columns_count;
                updatedEvent.general_ticket_price = req.body.general_ticket_price;
                updatedEvent.VIP_ticket_price = req.body.VIP_ticket_price;
                updatedEvent.priority_ticket_price = req.body.priority_ticket_price;
                updatedEvent.student_ticket_price = req.body.student_ticket_price;
                updatedEvent.child_ticket_price = req.body.child_ticket_price;
                updatedEvent.retired_ticket_price = req.body.retired_ticket_price;*/

                console.log('Update event');
                console.log(id);
                console.log(newData);

                /*originalEvent.updateOne(id).then(data => {
                    res.status(200).send(data);
                }).catch(error => {
                    res.status(500).send(error);
                });*/
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteEvent', (req: Request, res: Response) => {
        if(req.isAuthenticated()) {
            const id = req.query.id;
            const query = Event.deleteOne({_id: id});
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
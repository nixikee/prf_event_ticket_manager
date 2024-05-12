"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureTicketSalesRoutes = void 0;
const TicketSales_1 = require("../model/TicketSales");
const configureTicketSalesRoutes = (router) => {
    router.post('/addTicketSales', (req, res) => {
        const event = req.body.event;
        const places = req.body.places;
        const sold_general_ticket = req.body.sold_general_ticket;
        const sold_VIP_ticket = req.body.sold_VIP_ticket;
        const sold_priority_ticket = req.body.sold_priority_ticket;
        const sold_student_ticket = req.body.sold_student_ticket;
        const sold_child_ticket = req.body.sold_child_ticket;
        const sold_retired_ticket = req.body.sold_retired_ticket;
        const ticketSales = new TicketSales_1.TicketSales({ event: Event, places: [Number], sold_general_ticket: Number, sold_VIP_ticket: Number,
            sold_priority_ticket: Number, sold_student_ticket: Number, sold_child_ticket: Number, sold_retired_ticket: Number });
        ticketSales.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getAllTicketSales', (req, res) => {
        if (req.isAuthenticated()) {
            const query = TicketSales_1.TicketSales.find();
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
    router.get('/findTicketSales', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketSales_1.TicketSales.findById(id);
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
    router.put('/updateTicketSales', (req, res) => {
        const event = req.body.event;
        const places = req.body.places;
        const sold_general_ticket = req.body.sold_general_ticket;
        const sold_VIP_ticket = req.body.sold_VIP_ticket;
        const sold_priority_ticket = req.body.sold_priority_ticket;
        const sold_student_ticket = req.body.sold_student_ticket;
        const sold_child_ticket = req.body.sold_child_ticket;
        const sold_retired_ticket = req.body.sold_retired_ticket;
        const ticketSales = new TicketSales_1.TicketSales({ event: Event, places: [Number], sold_general_ticket: Number, sold_VIP_ticket: Number,
            sold_priority_ticket: Number, sold_student_ticket: Number, sold_child_ticket: Number, sold_retired_ticket: Number });
        ticketSales.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.delete('/deleteTicketSales', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketSales_1.TicketSales.deleteOne({ _id: id });
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
exports.configureTicketSalesRoutes = configureTicketSalesRoutes;

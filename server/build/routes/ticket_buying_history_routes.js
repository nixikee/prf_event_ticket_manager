"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureTicketBuyingHistoryRoutes = void 0;
const TicketBuyingHistory_1 = require("../model/TicketBuyingHistory");
const configureTicketBuyingHistoryRoutes = (router) => {
    router.post('/addTicketBuyingHistory', (req, res) => {
        const event = JSON.parse(req.body.event);
        const user = JSON.parse(req.body.user);
        const place_count = req.body.place_count;
        const purchased_ticket_type = req.body.purchased_ticket_type;
        const ticketBuyingHistory = new TicketBuyingHistory_1.TicketBuyingHistory({ event: event, user: user, place_count: place_count,
            purchased_ticket_type: purchased_ticket_type });
        ticketBuyingHistory.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getAllTicketBuyingHistory', (req, res) => {
        if (req.isAuthenticated()) {
            const query = TicketBuyingHistory_1.TicketBuyingHistory.find();
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
    router.get('/findTicketsBuyingHistory', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketBuyingHistory_1.TicketBuyingHistory.findById(id);
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
    router.put('/updateTicketBuyingHistory', (req, res) => {
        const event = JSON.parse(req.body.event);
        const user = JSON.parse(req.body.user);
        const place_count = req.body.place_count;
        const purchased_ticket_type = req.body.purchased_ticket_type;
        const ticketBuyingHistory = new TicketBuyingHistory_1.TicketBuyingHistory({ event: event, user: user, place_count: place_count,
            purchased_ticket_type: purchased_ticket_type });
        ticketBuyingHistory.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.delete('/deleteTicketBuyingHistory', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = TicketBuyingHistory_1.TicketBuyingHistory.deleteOne({ _id: id });
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
exports.configureTicketBuyingHistoryRoutes = configureTicketBuyingHistoryRoutes;

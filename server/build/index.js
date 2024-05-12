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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user_routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./passport/passport");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const BasicData_1 = require("./model/BasicData");
const User_1 = require("./model/User");
const Event_1 = require("./model/Event");
const TicketBuyingHistory_1 = require("./model/TicketBuyingHistory");
const TicketSales_1 = require("./model/TicketSales");
const event_routes_1 = require("./routes/event_routes");
const ticket_buying_history_routes_1 = require("./routes/ticket_buying_history_routes");
const ticket_sales_routes_1 = require("./routes/ticket_sales_routes");
const auth_routes_1 = require("./routes/auth_routes");
const app = (0, express_1.default)();
const port = 5000;
const urlDB = 'mongodb://localhost:6000/event_manager';
mongoose_1.default.connect(urlDB).then(((_) => __awaiter(void 0, void 0, void 0, function* () {
    /*try {
        await User.deleteMany({});
        console.log('Kollekció kiürítve.');
      } catch (error) {
          console.error('Hiba történt a kollekció kiürítése közben:', error);
      }
    
      try {
        await Event.deleteMany({});
        console.log('Kollekció kiürítve.');
      } catch (error) {
          console.error('Hiba történt a kollekció kiürítése közben:', error);
      }
    
      try {
        await TicketBuyingHistory.deleteMany({});
        console.log('Kollekció kiürítve.');
      } catch (error) {
          console.error('Hiba történt a kollekció kiürítése közben:', error);
      }
    
      try {
        await TicketSales.deleteMany({});
        console.log('Kollekció kiürítve.');
      } catch (error) {
          console.error('Hiba történt a kollekció kiürítése közben:', error);
      }*/
    const userCount = yield User_1.User.countDocuments();
    const eventCount = yield Event_1.Event.countDocuments();
    const ticketBuyingHistoryCount = yield TicketBuyingHistory_1.TicketBuyingHistory.countDocuments();
    const ticketSalesCount = yield TicketSales_1.TicketSales.countDocuments();
    console.log('Successfully connected to MongoDB.');
    if (userCount === 0) {
        try {
            yield User_1.User.insertMany(BasicData_1.users);
            console.log('Minden felhasználó sikeresen hozzáadva');
        }
        catch (error) {
            console.error('Hiba történt a felhasználók hozzáadása közben:', error);
        }
    }
    if (eventCount === 0) {
        try {
            yield Event_1.Event.insertMany(BasicData_1.events);
            console.log('Minden esemény sikeresen hozzáadva');
        }
        catch (error) {
            console.error('Hiba történt az események hozzáadása közben:', error);
        }
    }
    if (ticketBuyingHistoryCount === 0) {
        try {
            yield TicketBuyingHistory_1.TicketBuyingHistory.insertMany(BasicData_1.ticketBuyingHistory);
            console.log('Minden vásárlási előzmény sikeresen hozzáadva');
        }
        catch (error) {
            console.error('Hiba történt a vásárlási előzmények hozzáadása közben:', error);
        }
    }
    if (ticketSalesCount === 0) {
        try {
            yield TicketSales_1.TicketSales.insertMany(BasicData_1.ticketSales);
            console.log('A jegyértékesítések sikeresen hozzáadva');
        }
        catch (error) {
            console.error('Hiba történt a jegyértékesítések hozzáadása közben:', error);
        }
    }
}))).catch(error => {
    console.log(error);
    return;
});
const whiteList = ['http://localhost:4200'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const sessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use((0, express_session_1.default)(sessionOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.configurePassport)(passport_1.default);
app.use('/app/auth', (0, auth_routes_1.configureAuthRoutes)(passport_1.default, express_1.default.Router()));
app.use('/app/user', (0, user_routes_1.configureUserRoutes)(express_1.default.Router()));
app.use('/app/event', (0, event_routes_1.configureEventRoutes)(express_1.default.Router()));
app.use('/app/ticket-buying-history', (0, ticket_buying_history_routes_1.configureTicketBuyingHistoryRoutes)(express_1.default.Router()));
app.use('/app/ticket-sales', (0, ticket_sales_routes_1.configureTicketSalesRoutes)(express_1.default.Router()));
app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});

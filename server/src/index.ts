import express from 'express';
import { configureUserRoutes } from './routes/user_routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';
import cors from 'cors';
import { events, ticketBuyingHistory, ticketSales, users } from './model/BasicData';
import { User } from './model/User';
import { Event } from './model/Event';
import { TicketBuyingHistory } from './model/TicketBuyingHistory';
import { TicketSales } from './model/TicketSales';
import { configureEventRoutes } from './routes/event_routes';
import { configureTicketBuyingHistoryRoutes } from './routes/ticket_buying_history_routes';
import { configureTicketSalesRoutes } from './routes/ticket_sales_routes';
import { configureAuthRoutes } from './routes/auth_routes';

const app = express();
const port = 5000;
const urlDB = 'mongodb://localhost:6000/event_manager';

mongoose.connect(urlDB).then((async _ => {
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

  const userCount = await User.countDocuments();
  const eventCount = await Event.countDocuments();
  const ticketBuyingHistoryCount = await TicketBuyingHistory.countDocuments();
  const ticketSalesCount = await TicketSales.countDocuments();
  console.log('Successfully connected to MongoDB.');
  if (userCount === 0) {
    try {
      await User.insertMany(users);
      console.log('Minden felhasználó sikeresen hozzáadva');
    } catch (error) {
      console.error('Hiba történt a felhasználók hozzáadása közben:', error);
    }
  }
  if (eventCount === 0) {
    try {
      await Event.insertMany(events);
      console.log('Minden esemény sikeresen hozzáadva');
    } catch (error) {
      console.error('Hiba történt az események hozzáadása közben:', error);
    }
  }
  if (ticketBuyingHistoryCount === 0) {
    try {
      await TicketBuyingHistory.insertMany(ticketBuyingHistory);
      console.log('Minden vásárlási előzmény sikeresen hozzáadva');
    } catch (error) {
      console.error('Hiba történt a vásárlási előzmények hozzáadása közben:', error);
    }
  }
  if (ticketSalesCount === 0) {
    try {
      await TicketSales.insertMany(ticketSales);
      console.log('A jegyértékesítések sikeresen hozzáadva');
    } catch (error) {
      console.error('Hiba történt a jegyértékesítések hozzáadása közben:', error);
    }
  }
})).catch(error => {
    console.log(error);
    return;
});

const whiteList = ['http://localhost:4200'];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whiteList.indexOf(origin!) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
}
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app/auth', configureAuthRoutes(passport, express.Router()));
app.use('/app/user', configureUserRoutes(express.Router()));
app.use('/app/event', configureEventRoutes(express.Router()));
app.use('/app/ticket-buying-history', configureTicketBuyingHistoryRoutes(express.Router()));
app.use('/app/ticket-sales', configureTicketSalesRoutes(express.Router()));

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
});
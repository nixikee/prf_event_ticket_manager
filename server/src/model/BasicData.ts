// Insert the article in our MongoDB database
//await user1.save();

import { User } from "./User";

export const users = [{
    email: 'eni12@gmail.com',
    firstname: 'Enikő',
    lastname: 'Fedre',
    nickname: 'eni12',
    birthdate: "2000-05-11T20:14:14.796Z",
    address: 'Debrecen',
    phonenumber: '06202345676',
    role: 'ADMIN',
    password: 'Derek12'
},
{
    email: 'ferenc65@gmail.com',
    firstname: 'Ferenc',
    lastname: 'Gerte',
    nickname: 'ferenc65',
    birthdate: "1991-11-30T03:34:56.796Z",
    address: 'Iregszemcse',
    phonenumber: '06308764367',
    role: 'ADMIN',
    password: 'admFer54'
},
{
    email: 'kissl@gmail.com',
    firstname: 'Lajos',
    lastname: 'Varda',
    nickname: 'lajcsi56',
    birthdate: "1983-02-19T23:46:36.796Z",
    address: 'Szeged',
    phonenumber: '06209824527',
    role: 'ADMIN',
    password: 'LakFer45'
},
{
    email: 'mate97@gmail.com',
    firstname: 'Máté',
    lastname: 'Lakkos',
    nickname: 'mate97',
    birthdate: "1997-12-18T17:37:52.796Z",
    address: 'Szeged',
    phonenumber: '06304356239',
    role: 'USER',
    password: 'Razor97'
},
{
    email: 'eliza85@gmail.com',
    firstname: 'Enikő',
    lastname: 'Fedre',
    nickname: 'eni12',
    birthdate: "1985-07-08T05:17:14.796Z",
    address: 'Eger',
    phonenumber: '06207655926',
    role: 'USER',
    password: 'FeketeParduc59'
},
{
    email: 'kender43@gmail.com',
    firstname: 'Károly',
    lastname: 'Kender',
    nickname: 'karcsi06',
    birthdate: "2006-04-17T13:39:14.796Z",
    address: 'Győr',
    phonenumber: '06305468729',
    role: 'USER',
    password: 'KertesFedel94'
}];

export const events = [{
    creator: users[0],
    title: 'Pünkösdi fesztivál',
    startdate: "2024-05-17T09:00:00.796Z",
    finishdate: "2024-05-20T21:00:00.796Z",
    location: 'Szeged, Kárász utca',
    place_count: 300,
    general_ticket_price: 0,
    VIP_ticket_price: 0,
    priority_ticket_price: 0,
    student_ticket_price: 0,
    child_ticket_price: 0,
    retired_ticket_price: 0,
    image: 'kep'
},
{
    creator: users[1],
    title: 'Virág karnevál',
    startdate: "2024-08-15T09:00:00.796Z",
    finishdate: "2024-08-21T21:00:00.796Z",
    location: 'Debrecen',
    place_count: 500,
    general_ticket_price: 8000,
    VIP_ticket_price: 15000,
    priority_ticket_price: 12000,
    student_ticket_price: 5000,
    child_ticket_price: 3000,
    retired_ticket_price: 3000,
    image: 'kep'
},
{
    creator: users[2],
    title: 'Szegedi Ifjúsági Napok',
    startdate: "2024-08-22T15:00:00.796Z",
    finishdate: "2024-08-28T05:00:00.796Z",
    location: 'Szeged',
    place_count: 10000,
    general_ticket_price: 12000,
    VIP_ticket_price: 20000,
    priority_ticket_price: 18000,
    student_ticket_price: 7000,
    child_ticket_price: 4000,
    retired_ticket_price: 4000,
    image: 'kep'
},
{
    creator: users[1],
    title: 'Veszprémi Egyetemi Napok',
    startdate: "2024-05-12T10:00:00.796Z",
    finishdate: "2024-08-16T23:00:00.796Z",
    location: 'Veszprém',
    place_count: 8000,
    general_ticket_price: 7000,
    VIP_ticket_price: 14000,
    priority_ticket_price: 10000,
    student_ticket_price: 4000,
    child_ticket_price: 3000,
    retired_ticket_price: 3000,
    image: 'kep'
}];

export const ticketSales = [{
    event: events[0],
    place_count: 2,
    sold_general_ticket: 200,
    sold_VIP_ticket: 10,
    sold_priority_ticket: 10,
    sold_student_ticket: 10,
    sold_child_ticket: 2,
    sold_retired_ticket: 0
 },
 {
    event: events[1],
    place_count: 4,
    sold_general_ticket: 150,
    sold_VIP_ticket: 25,
    sold_priority_ticket: 37,
    sold_student_ticket: 13,
    sold_child_ticket: 24,
    sold_retired_ticket: 67
 },
{
    event: events[2],
    place_count: 3,
    sold_general_ticket: 356,
    sold_VIP_ticket: 254,
    sold_priority_ticket: 185,
    sold_student_ticket: 397,
    sold_child_ticket: 128,
    sold_retired_ticket: 38
},
{
    event: events[3],
    place_count: 6,
    sold_general_ticket: 287,
    sold_VIP_ticket: 253,
    sold_priority_ticket: 143,
    sold_student_ticket: 267,
    sold_child_ticket: 45,
    sold_retired_ticket: 87
}];

 export const ticketBuyingHistory = [{
    event: events[0],
    user: users[0],
    place_count: 2,
    purchased_ticket_type: 'General ticket'
 },
{
    event: events[1],
    user: users[1],
    place_count: 4,
    purchased_ticket_type: 'General ticket'
},
{
    event: events[2],
    user: users[2],
    place_count: 3,
    purchased_ticket_type: 'General ticket'
},
{
    event: events[3],
    user: users[3],
    place_count: 6,
    purchased_ticket_type: 'General ticket'
}];
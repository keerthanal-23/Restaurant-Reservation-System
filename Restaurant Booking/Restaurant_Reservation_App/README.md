# Periodic Tables - Restaurant Reservation System
## Capstone Project for Thinkful Engineering Immersion Program

### [Live link to deployed application](https://reservations-frontend.herokuapp.com/dashboard)

Periodic Tables is a full stack reservation system for fine dining restaurants. This software would be used internally by restaurant staff to organize reservations and table seating. The user can enter reservations, cancel and adjust reservations, seat reservations at specific tables, change table status and look up reservations by phone number.

This project was built with JavaScript, React.js, HTML, CSS, Bootstrap, Node.js, Express, and PostgreSQL in conjuction with VSCode, Postman, DBeaver, ElephantSQL, Knex, and Heroku. The API is RESTful and can execute all CRUDL operations.

This repository is set up as a monorepo, meaning that the frontend and backend projects are in one repository.

## Installation

1. Clone this repository.
   ```git clone https://github.com/the-coding-forester/Restaurant_Reservation_App.git```
2. Navigate to the repository locally.
   ```cd restaurant-reservation-system```
4. Run `npm install` to install project dependencies.
5. Run `npm run start:dev` to start the client and server concurrently.

If you have trouble getting the server to run, feel free to reach out for help!

## Application navigation

The table below describes the paths for navigating the application:

| URL Endpoint | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `/dashboard`     | Application homepage, will display today's reservations by default.  |
| `/dashboard/?date=YYYY-MM-DD`    | Displays reservations for a specific date. |
| `/reservations`    | Redirects to dashboard/homepage. |
| `/reservations/new`    | Create a new reservation. |
| `/reservations/:reservation_id/seat`    | Seat a reservation at a table. |
| `/reservations/:reservation_id/edit`    | Edit an existing reservation. |
| `/tables/new`    | Create a new table. |
| `/search `    | Search for reservations by phone number. |

## API documentation

All GET requests return a JSON response. All POST/PUT requests require an application/json body, and return a JSON response.

### Endpoints for reservations

**List all reservations for one date**: `GET /reservations?date=YYYY-MM-DD`
- Gets all reservations for reservation date query
- Successful GET request will return an array of JSON objects representing each reservation, each containing the following fields:
   - `reservation_id`: integer
   - `first_name`: string
   - `last_name`: string
   - `mobile_number`: string (formatted 000-000-0000)
   - `reservation_date`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `reservation_time`: string (formatted HH:MM:SS)
   - `people`: integer
   - `created_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `updated_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `status`: string

**Create a reservation**: `POST /reservations or /reservations?date=YYYY-MM-DD`
- Posts one reservation
- Post body must contain `first_name`, `last_name`, `mobile_number`, `reservation_date`, `reservation_time`, `people` (see above for data types)
- Database will then create `reservation_id`, `created_at`, `updated_at` and `status` fields (`status` defaults to "booked")
- Successful POST request will return JSON of the posted reservation

**Get one reservation**: `GET /reservations/:reservation_id`
- Gets one reservation based on `reservation_id` parameter
- Successful GET request will return JSON of the reservation

**Update one reservation**: `PUT /reservations/:reservation_id`
- Updates one reservation based on `reservation_id` parameter
- Request body must contain same fields as POST request (above)
- Successful PUT request will return JSON of the updated reservation

**Update one reservation's status**: `PUT /reservations/:reservation_id/status`
- Updates `status` of one reservation based on `reservation_id` parameter
- Request body must contain a `status` key with a string value
- Successful PUT request will return JSON of the updated reservation

### Endpoints for tables

**List all tables**: `GET /tables`
- Gets all tables
- Successful GET request will return an array of JSON objects representing each table, each containing the following fields:
   - `table_id`: integer
   - `table_name`: string
   - `capacity`: integer
   - `created_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `updated_at`: string (formatted YYYY-MM-DDT00:00:00.000Z)
   - `reservation_id`: integer

**Create a table**: `POST /tables`
- Posts one table
- Post body must contain `table_name` and `capacity` (see above for data types)
- Database will then create `table_id`, `created_at`, `updated_at` and `reservation_id` fields (`reservation_id` defaults to null)
- Successful POST request will return JSON of the posted table

**Get one table**: `GET /tables/:table_id`
- Gets one table based on table_id parameter
- Successful GET request will return JSON of the table

**Update one table's reservation assignment**: `PUT /tables/:table_id/seat`
- Updates `reservation_id` of one table based on `table_id` parameter
- Request body must contain a `reservation_id` key with a string value
- Successful PUT request will return JSON of the updated table

**Delete one table's reservation assignment**: `DELETE /tables/:table_id/seat`
- Deletes one table's `reservation_id` (by reverting it to null) based on `table_id` parameter
- Will also make PUT request to `/reservations/:reservation_id/status` to update reservation `status` to "finished"
- Successful DELETE request will return JSON of the updated table

## Technology

**Frontend**: JavaScript, React.js (including Router), HTML, CSS, Bootstrap

**Backend**: Node.js, Express, PostgreSQL

**Other tools used**: Jest, Postman, DBeaver, ElephantSQL, Knex, Heroku

## ScreenShots
### Desktop Views

**Dashboard**

![Dashboard Page Desktop View](https://github.com/the-coding-forester/Restaurant_Reservation_App/blob/main/Finished_Screenshots/Dashboard_2_Desktop.png?raw=true)

**Create a reservation**

![New Reservation Page Desktop View](https://github.com/the-coding-forester/Restaurant_Reservation_App/blob/main/Finished_Screenshots/New_Reservation_Desktop.png?raw=true)

**Create a table**

![New_Table Page Desktop View](https://github.com/the-coding-forester/Restaurant_Reservation_App/blob/main/Finished_Screenshots/New_Table_Desktop.png?raw=true)

**Edit a reservation**

![Edit_Reservation Page Desktop View](https://github.com/the-coding-forester/Restaurant_Reservation_App/blob/main/Finished_Screenshots/Edit_Reservation_Desktop.png?raw=true)

**Seat a reservation at a table**

![Seat Reservation Page Desktop View](https://github.com/the-coding-forester/Restaurant_Reservation_App/blob/main/Finished_Screenshots/Seat_Reservation_Desktop.png?raw=true)

**Search reservations by phone number**

![Search Desktop Page View](https://github.com/the-coding-forester/Restaurant_Reservation_App/blob/main/Finished_Screenshots/Search_Desktop.png?raw=true)


import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import EditReservation from "../editReservation/EditReservation";
import NotFound from "../Errors/NotFound";
import NewReservationPage from "../reservations/NewReservations";
import SearchByMobile from "../searchByMobile/SearchByMobile";
import SeatReservationPage from "../seatReservation/SeatReservation";
import NewTablePage from "../tables/NewTables"
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <>
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Redirect to={"/dashboard"} />
          </Route>
          <Route exact={true} path="/reservations">
            <Redirect to={"/dashboard"} />
          </Route>
          <Route exact={true} path="/dashboard">
            <Dashboard date={today()} />
          </Route>
          <Route exact={true} path="/reservations/new">
            <NewReservationPage />
          </Route>
          <Route exact={true} path="/reservations/:reservation_id/edit">
            <EditReservation />
          </Route>
          <Route exact={true} path="/reservations/:reservation_id/seat">
            <SeatReservationPage />
          </Route>
          <Route exact={true} path="/tables">
            <Redirect to={"/dashboard"} />
          </Route>
          <Route exact={true} path="/tables/new">
            <NewTablePage />
          </Route>
          <Route exact={true} path="/search">
            <SearchByMobile />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Routes;
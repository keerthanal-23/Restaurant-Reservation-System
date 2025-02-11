import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationList from "./ReservationList";
import TableList from "./TableList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import LegendModal from "../utils/LegendModal";



function Dashboard() {
  const query = useQuery();
  const queryDate = query.get("date")
  const history = useHistory();

  // State Assignment
  const [date, setDate] = useState(queryDate || today)
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);
  const [updatedTableSeat, setUpdatedTableSeat] = useState(null);
  const [cancelledReservation, setCancelledReservation] = useState(null);
  const [show, setShow] = useState(false);

  //Setting state of Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Loading Reservation List
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const results = await listReservations({ date }, abortController.signal)
        setReservations(results)
      } catch (err) {
        setReservationsError(err)
      }
    })();

    return () => abortController.abort();

  }, [date, tables, cancelledReservation])

  // Loading Table List
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const result = await listTables({}, abortController.signal);
        setTables(result)
      } catch (err) {
        setTablesErrors(err)
      }
    })();

    return () => abortController.abort();

  }, [updatedTableSeat])


  // Handler for table changes
  const onUpdateTable = (updatedTable) => {
    setUpdatedTableSeat(updatedTable);
  }

  // Handler for cancelling reservation
  const onCancelReservation = (cancelledReservation) => {
    setCancelledReservation(cancelledReservation);
  }

  // Buttons for changing date on dashboard
  const toggleToPrevious = () => {
    setDate(previous(date));
    history.push(`/dashboard/?date=${previous(date)}`);
  };

  const toggleToToday = () => {
    if (date !== today) {
      setDate(today);
    }
    history.push(`/dashboard`);
  };

  const toggleToNext = () => {
    setDate(next(date));
    history.push(`/dashboard/?date=${next(date)}`);
  };



  return (
    // Utilizes bootstrap for style, responsiveness, and mobile/desktop compatibility
    <>
      <main>
        <div className="row justify-content-md-center">
          <h1 className="d-none d-lg-block"> Dashboard</h1>
        </div>
        <div>
          <div className="row justify-content-md-center">
            <h2 className="col-lg-6 mb-4">Reservations: {date.slice(0, 10)}</h2>
          </div>
          <div className="row justify-content-md-center">
            <button className="col" onClick={toggleToPrevious}>Previous</button>
            <button className="col" onClick={toggleToToday}>Today</button>
            <button className="col" onClick={toggleToNext}>Next</button>
          </div>
        </div>
        <h3 className="row mt-5 d-none d-lg-block">Reservations</h3>
        <h3 className="d-lg-none">
          Reservations &nbsp;
          {/**Button trigger modal */}
          <button variant="primary" className="d-lg-none" onClick={handleShow}>
            <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
          </button>
        </h3>

        <ReservationList
          reservations={reservations}
          reservationsError={reservationsError}
          onCancelReservation={onCancelReservation}
        />
        <h3 className="row mt-5">Tables</h3>
        <ul className="list-group my-2">
          <TableList
            tables={tables}
            tablesErrors={tablesErrors}
            onUpdateTable={onUpdateTable}
          />
        </ul>
      </main>
      {/**Modal */}
      <LegendModal
        handleClose={handleClose}
        show={show}
      />
    </>
  )
}

export default Dashboard;
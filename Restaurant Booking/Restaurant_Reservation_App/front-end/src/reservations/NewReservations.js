import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../Errors/ErrorAlert";
import { createReservation } from "../utils/api";
import validateForms from "../utils/validateForms";
import ReservationForm from "./ReservationsForm";

function NewReservationPage() {
  let history = useHistory();
  const today = new Date();
  const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const currentTime = today.getHours() + ":" + today.getMinutes();

  const initialReservationState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: currentDay,
    reservation_time: currentTime,
    people: 1,
  };

  const [reservation, setReservation] = useState({ ...initialReservationState });
  const [reservationsErrors, setReservationErrors] = useState([]);


  //Handles creating reservation
  const handleCreateReservation = async () => {
    const abortController = new AbortController();

    try {
      const errors = validateForms(reservation);
      if (errors.length) {
        setReservationErrors(errors)
        return
      }
      const result = await createReservation(reservation, abortController.signal)
      setReservation({ ...initialReservationState })
      history.push(`/dashboard?date=${result.reservation_date}`);

    }
    catch (err) {
      setReservationErrors([err])
    }

    return () => abortController.abort();

  }

  // Handles canceling creating a reservation & resets form
  const handleCancelReservation = async () => {
    setReservation({ ...initialReservationState })
    history.goBack();
  }

  return (
    <div className="NewReservation">

      <h1>New Reservations</h1>

      <ReservationForm
        reservation={reservation}
        onReservationChanged={setReservation}
        onCancel={handleCancelReservation}
        onSubmit={handleCreateReservation}
      />
      {reservationsErrors.map((error) => {
        return <ErrorAlert key={error} error={error} />;
      })}
    </div>
  )
}

export default NewReservationPage;
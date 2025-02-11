import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../Errors/ErrorAlert";
import ReservationForm from "../reservations/ReservationsForm";
import { readReservation, updateReservation } from "../utils/api";
import validateForms from "../utils/validateForms";


function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const [editedReservation, setEditedReservation] = useState({});
  const [reservationsErrors, setReservationErrors] = useState([]);

  // Loads reservation information (read)
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        const results = await readReservation(reservation_id, abortController.signal)
        setEditedReservation(results);
      } catch (err) {
        setReservationErrors(err)
      }
    })();

    return () => abortController.abort();

  }, [reservation_id])

  // Handles reservation edits
  const handleEditReservation = async () => {
    const abortController = new AbortController();

    try {
      const errors = validateForms(editedReservation);
      if (errors.length) {
        setReservationErrors(errors)
        return
      }
      const result = await updateReservation(editedReservation, abortController.signal);
      history.push(`/dashboard?date=${result.reservation_date}`);

    } catch (err) {
      setReservationErrors([err])
    }

    return () => abortController.abort();

  }

  // Handles cancel edit
  const handleCancelEdit = () => {
    history.goBack();
  }

  return (
    // Utilizes bootstrap for style, responsiveness, and mobile/desktop compatibility
    <div className="edit-reservation">
      <h1>Edit Reservation</h1>
      <ReservationForm
        reservation={editedReservation}
        onReservationChanged={setEditedReservation}
        onCancel={handleCancelEdit}
        onSubmit={handleEditReservation}
      />
      {reservationsErrors.map((error) => {
        return <ErrorAlert key={error} error={error} />;
      })}
    </div>
  )
}

export default EditReservation;
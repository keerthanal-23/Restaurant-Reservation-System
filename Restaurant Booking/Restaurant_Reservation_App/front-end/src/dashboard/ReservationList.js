import ErrorAlert from "../Errors/ErrorAlert";
import ReservationItem from "./ReservationItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTools } from '@fortawesome/free-solid-svg-icons';



function ReservationList({ reservations, reservationsError, onCancelReservation }) {

  return (
    // Utilizes bootstrap for style, responsiveness, and mobile/desktop compatibility
    <div>
      <table className="table d-table align-middle" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr className="d-table-row">
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Time</span>
              <span className="d-lg-none oi oi-clock"></span>
            </th>
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Last Name</span>
              <span className="d-lg-none">Last</span>
            </th>
            <th className="col d-none d-md-table-cell">
              <span className="d-none d-lg-block">First Name</span>
              <span className="d-none d-md-block d-lg-none">First</span>
            </th>
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Party Size</span>
              <span className="d-lg-none oi oi-people"></span>
            </th>
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Status</span>
              <FontAwesomeIcon className="d-lg-none" icon={faInfo}></FontAwesomeIcon>
            </th>
            <th className="col d-none d-lg-table-cell">Seat</th>
            <th className="col d-none d-lg-table-cell">Edit</th>
            <th className="col d-none d-lg-table-cell">Cancel</th>
            <th className="col d-lg-none">
              <FontAwesomeIcon className="d-lg-none" icon={faTools}></FontAwesomeIcon>
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <ReservationItem
              key={reservation.reservation_id}
              reservation={reservation}
              onCancelReservation={onCancelReservation}
            />
          ))}
        </tbody>
      </table>
      <ErrorAlert error={reservationsError} />
    </div>
  )
}

export default ReservationList;
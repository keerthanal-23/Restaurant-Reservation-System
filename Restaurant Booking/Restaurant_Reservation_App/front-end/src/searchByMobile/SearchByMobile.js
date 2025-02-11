import { useState } from "react";
import ReservationList from "../dashboard/ReservationList";
import ErrorAlert from "../Errors/ErrorAlert";
import { listReservations } from "../utils/api";

function SearchByMobile() {
  const [input, setInput] = useState("")
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  // Sets state on change
  const onChange = (event) => setInput(event.target.value)

  // Handles submit
  const handleClickFind = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      const results = await listReservations({ mobile_number: input }, abortController.signal)
      setReservations(results)
    } catch (err) {
      setReservationsError(err)
    };

    return () => abortController.abort();

  };

  return (
    <div className="SearchByMobile">
      <h1 className="oi oi-magnifying-glass"> Search</h1>
      <br />
      <form className="search-form">
        <label className="form-label form-control-lg" htmlFor="mobile_number">
          Phone Number
        </label>
        <input
          className="form-control"
          type="tel"
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter a customer's phone number"
          value={input}
          onChange={onChange}
        />
        <br />
        <button className="btn btn-success" type="submit" onClick={handleClickFind}>Find</button>
      </form>
      <br />
      <ErrorAlert error={reservationsError} />
      {reservations.length > 0 && input.length > 0 ?
        <ReservationList reservations={reservations} reservationsError={reservationsError} page="search" />
        :
        `No reservations found for input '${input}'`
      }
    </div>
  )
}

export default SearchByMobile;
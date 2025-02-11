function ReservationForm({
  reservation,
  onReservationChanged,
  onSubmit,
  onCancel }) {


  // STATE HANDLERS set state for each field on submit

  const handleFirstNameChange = (event) => {
    onReservationChanged({
      ...reservation,
      first_name: event.target.value,
    });
  };

  const handleLastNameChange = (event) => {
    onReservationChanged({
      ...reservation,
      last_name: event.target.value,
    });
  };

  const handleMobileNumberChange = (event) => {
    onReservationChanged({
      ...reservation,
      mobile_number: (event.target.value).replace(/[^0-9,.]+/g, ""),
    });
  };

  const handlePeopleChange = (event) => {
    onReservationChanged({
      ...reservation,
      people: Number(event.target.value),
    });
  };

  const handleReservationDateChange = (event) => {
    onReservationChanged({
      ...reservation,
      reservation_date: event.target.value,
    });
  };

  const handleReservationTimeChange = (event) => {
    onReservationChanged({
      ...reservation,
      reservation_time: event.target.value
    });
  };

  // Handles clicking cancel
  const handleClickCancel = (event) => {
    event.preventDefault();
    onCancel();
  }

  // Handles submitting form
  const handleSubmitForm = (event) => {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="reservation-edit" onSubmit={handleSubmitForm}>
      <div className="form-group">
        <label htmlFor="first_name">First name</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          className="form-control"
          required
          placeholder={"First Name"}
          onChange={handleFirstNameChange}
          defaultValue={reservation.first_name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last name</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          className="form-control"
          required
          placeholder={"Last Name"}
          onChange={handleLastNameChange}
          defaultValue={reservation.last_name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          id="mobile_number"
          type="tel"
          name="mobile_number"
          className="form-control"
          required
          pattern="([0-9]{3}(|-))?([0-9]{3}-[0-9]{4}|[0-9]{3}[0-9]{4})"
          placeholder={"1234567890"}
          maxLength="12"
          onChange={handleMobileNumberChange}
          defaultValue={reservation.mobile_number}
        />
      </div>
      <div className="form-group">
        <label htmlFor="people">Party size</label>
        <input
          id="people"
          type="number"
          name="people"
          className="form-control"
          required
          placeholder={"Party Size"}
          onChange={handlePeopleChange}
          defaultValue={reservation.people}
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          className="form-control"
          required
          placeholder={"YYYY-MM-DD"}
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={handleReservationDateChange}
          defaultValue={reservation.reservation_date}
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          className="form-control"
          required
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={handleReservationTimeChange}
          defaultValue={reservation.reservation_time}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleClickCancel}
      >
        <span aria-hidden="true">&times; Cancel</span>
      </button>
      <button
        type="submit"
        className="btn btn-primary">
        <span className="oi oi-book"> Submit</span>
      </button>
    </form>
  )
}

export default ReservationForm;



function validateForms(reservation) {

  const resDateAndTime = new Date(reservation.reservation_date + ' ' + reservation.reservation_time);
  const today = Date.now();
  const resTime = Number(reservation.reservation_time.replace(/:/g, '').slice(0, 4))

  const resErrors = [];

  // Check if date is on a Tuesday
  if (resDateAndTime.getUTCDay() === 2) {
    resErrors.push({ message: `Restaurant closed on Tuesdays` });
  }

  // Check if date is in the future
  if (resDateAndTime.getTime() < today) {
    resErrors.push({ message: `Reservation must be made for a time and date in the future` });
  }

  // Check if reservation time is between 9:30am and 9:30pm"
  if (resTime < 1030 || resTime > 2130) {
    resErrors.push({ message: `Reservations can only be made for between 10:30AM and 9:30PM. The restaurant closes at 10:30PM.` })
  }

  return resErrors;

}

export default validateForms;
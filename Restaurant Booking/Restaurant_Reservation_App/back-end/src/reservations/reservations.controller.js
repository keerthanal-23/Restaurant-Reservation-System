/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// VALIDATION MIDDLEWARE

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
];

const hasOnlyValidProperties = (req, res, next) => {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

// Validate that reservation with id in params exists
const reservationExists = async (req, res, next) => {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId)

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation_id ${reservationId} does not exist.`
  });

};

// Validate that reservation date is a date
const hasValidDate = (req, res, next) => {
  const { reservation_date } = req.body.data;
  const result = Date.parse(reservation_date);

  if (isNaN(result)) {
    return next({
      status: 400,
      message: `reservation_date '${reservation_date}' is not a date.`
    });
  }
  next();
}

// Validate that reservation time is a time
const hasValidTime = (req, res, next) => {
  const { reservation_time } = req.body.data;
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  //will store the result of if time matches the regex format
  const result = reservation_time.match(regex);

  if (result) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_time '${reservation_time}' is not a time.`
  })
}

// Validate that party size is a number
const hasValidNumberPeople = (req, res, next) => {
  const { people } = req.body.data;

  if (typeof people === "number" && people >= 1) {
    return next();
  }

  next({
    status: 400,
    message: "Amount of people for party size must be a integer/whole number of at least 1."
  });
}

// Return error if reservation is on a Tuesday
const reservationNotForTuesday = (req, res, next) => {
  const { reservation_date } = req.body.data
  const dayOfWeek = new Date(reservation_date).getUTCDay();
  // Tuesday would be represented by 2

  if (dayOfWeek !== 2) {
    return next();
  }
  next({
    status: 400,
    message: `Restaurant closed on Tuesdays`
  })
}

// Return error if reservation is for a day in the past
const reservationForFutureDate = (req, res, next) => {
  const { reservation_date, reservation_time } = req.body.data
  const today = Date.now();
  const dateInQuestion = new Date(reservation_date + ' ' + reservation_time)

  if (dateInQuestion > today) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation time and date must be made for a future time and date`
  })
}

// Return error if reservation is NOT between 10:30am and 9:30pm
const reservationForResHours = (req, res, next) => {
  const { reservation_time } = req.body.data
  //splice to make format HHMM and never HHMMSS
  const resTime = Number(reservation_time.slice(0, 2) + reservation_time.slice(3, 5));

  if (resTime < 1030 || resTime > 2130) {
    return next({
      status: 400,
      message: `Reservation_time must be between 10:30AM and 9:30PM. The restaurant closes at 10:30PM.`
    })
  }
  next();
}

// Checks if reservation status is seated OR finished
const statusIsSeatedOrFinished = (req, res, next) => {
  const { status } = req.body.data

  if (status === "seated") {
    return next({
      status: 400,
      message: `Reservation status is seated.`
    })
  }
  if (status === "finished") {
    return next({
      status: 400,
      message: `Reservation status is finished.`
    })
  }
  next();
}

// Checks status if status is known (booked, seated, or finished)
const statusIsKnown = (req, res, next) => {
  const { status } = req.body.data

  if (
    status === "booked" ||
    status === "seated" ||
    status === "finished" ||
    status === "cancelled"
  ) {
    return next()
  }
  next({
    status: 400,
    message: `Reservation status is unknown, status should be "booked, 'seated', or 'finished'.`
  })
}

// Check if status is finished
const statusIsFinishedOrCancelled = (req, res, next) => {
  const { status } = res.locals.reservation;

  if (status === "finished") {
    return next({
      status: 400,
      message: `Status is "finished".`
    })
  }
  if (status === "cancelled") {
    return next({
      status: 400,
      message: `Status is "cancelled".`
    })
  }
  next();
}

const statusIsBooked = (req, res, next) => {
  const { status } = res.locals.reservation;

  if (status === "booked") {
    return next();
  }
  next({
    status: 400,
    message: `Only "booked" reservations may be edited`
  })
}

const hasRequiredStatus = hasProperties(["status"]);

const hasOnlyValidStatus = (req, res, next) => {
  const { data = {} } = req.body;

  const statusField = ["status"]

  const invalidFields = Object.keys(data).filter(
    (field) => !statusField.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// CRUD Functions

const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

const list = async (req, res) => {
  const { date, mobile_number } = req.query;

  if (date) {
    const data = await service.listReservationsByDay(date);
    res.json({ data });

  } else if (mobile_number) {
    const data = await service.search(mobile_number);
    res.json({ data });

  } else {
    const data = await service.list();
    res.json({ data });
  }
}

const read = async (req, res) => {
  const data = res.locals.reservation;
  res.json({ data });
}

const update = async (req, res) => {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data })
}

const destroy = async (req, res) => {
  const { reservation } = res.locals;
  await service.delete(reservation.reservation_id);
  res.sendStatus(204);
}


module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumberPeople,
    reservationNotForTuesday,
    reservationForFutureDate,
    reservationForResHours,
    statusIsSeatedOrFinished,
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
  read: [
    asyncErrorBoundary(reservationExists),
    read
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    hasValidNumberPeople,
    reservationNotForTuesday,
    reservationForFutureDate,
    reservationForResHours,
    statusIsSeatedOrFinished,
    statusIsBooked,
    asyncErrorBoundary(update)
  ],
  delete: [
    asyncErrorBoundary(destroy)
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasOnlyValidStatus,
    hasRequiredStatus,
    statusIsFinishedOrCancelled,
    statusIsKnown,
    asyncErrorBoundary(update),
  ],
}
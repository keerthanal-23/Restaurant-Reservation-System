const knex = require('../db/connection');

const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties")
const reservationsService = require("../reservations/reservations.service");

// VALIDATION MIDDLEWARE
const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id",
  "people"
];

const REQUIRED_PROPERTIES = [
  "table_name",
  "capacity",
];

//Checks id data is present
const hasData = (req, res, next) => {
  const { data } = req.body;

  if (data) {
    return next();
  }
  next({
    status: 400,
    message: `data is required`
  })
}

// Checks if properties are valid
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

// Checks if it has all the required properties
const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

// Check if table exists
const tableExists = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await service.read(tableId);

  //if table exists move on
  if (table) {
    res.locals.table = table;
    return next();
  }
  //return error if table doesn't exist
  return next({
    status: 404,
    message: `Table_id ${tableId} not found.`
  });
}

// Check if table has name
const hasValidName = (req, res, next) => {
  const { table_name } = req.body.data;

  if (table_name.length < 2) {
    //return error if table name is less than 2 characters
    return next({
      status: 400,
      message: `The table_name '${table_name}' must be at least 2 characters long.`
    });
  }
  return next();
}

// Check if capacity is at least one
const hasValidCapacity = (req, res, next) => {
  const { capacity } = req.body.data;

  // check that capacity is a number AND greater than 0
  if (capacity > 0 && Number.isInteger(capacity)) {
    return next();
  }
  next({
    status: 400,
    message: `Table capacity '${capacity}' must be a number greater than 0.`
  });
}

// Checks id reservation_id is present
const hasReservationId = (req, res, next) => {
  const { reservation_id } = req.body.data

  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `reservation_id is required`
  })
}

// Check if reservation_id exists
const reservationIdExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const validId = await reservationsService.read(reservation_id);

  if (validId) {
    return next();
  }
  next({
    status: 404,
    message: `reservation_id '${reservation_id}' does not exist`
  })
}

// Check if table has sufficient capacity
const hasSufficientCapacity = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  const people = reservation.people;
  const { table } = res.locals;
  const capacity = table.capacity

  if (capacity < people) {
    return next({
      status: 400,
      message: `Table capacity must be greater than or equal to party size or number of people.`
    })
  }
  next();
}

// Checks if table is vacant
const tableIsVacant = (req, res, next) => {
  const table = res.locals.table;
  if (!table.reservation_id) {
    return next();
  }

  next({
    status: 400,
    message: `table_id '${table.table_id}' is occupied by reservation_id '${table.reservation_id}'.`,
  });
}

// Checks if table is occupied
const tableIsOccupied = (req, res, next) => {
  const table = res.locals.table;
  if (table.reservation_id) {
    return next();
  }

  next({
    status: 400,
    message: `table_id '${table.table_id}' is not occupied.`,
  })
}

// Checks if reservation is waiting to be seated
const notSeated = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);

  if (reservation.status !== "seated") {
    return next()
  }
  next({
    status: 400,
    message: `Reservation already seated.`
  })
}

// CRUD FUNCTIONS

const create = async (req, res) => {
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

const list = async (req, res) => {
  const data = await service.list();
  res.json({ data });
}

const read = async (req, res) => {
  const data = res.locals.table;
  res.json({ data });
}

const update = async (req, res) => {
  const transaction = await knex.transaction();

  try {
    const table_id = req.params.tableId;
    const { reservation_id } = req.body.data;


    const [data] = await Promise.all([
      service.update({
        reservation_id,
        occupied: true,
        table_id,
      }, transaction),
      reservationsService.update({
        reservation_id,
        status: 'seated',
      }, transaction),
    ]);

    await transaction.commit();

    res.status(200).json({ data });
  } catch (err) {
    transaction.rollback();

    throw err;
  }
}

const finishReservation = async (req, res) => {
  const transaction = await knex.transaction();

  try {
    const table_id = req.params.tableId;

    const [data] = await Promise.all([
      service.update({
        reservation_id: null,
        occupied: false,
        table_id,
      }, transaction),
      reservationsService.update({
        reservation_id: res.locals.table.reservation_id,
        status: 'finished',
      }, transaction),
    ]);

    await transaction.commit();

    res.status(200).json({ data });
  } catch (err) {
    await transaction.rollback();

    throw err;
  }
}

module.exports = {
  create: [
    hasData,
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidName,
    hasValidCapacity,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(read),
  ],
  update: [
    hasData,
    hasReservationId,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(hasSufficientCapacity),
    tableIsVacant,
    notSeated,
    asyncErrorBoundary(update),
  ],
  finishReservation: [
    asyncErrorBoundary(tableExists),
    tableIsOccupied,
    asyncErrorBoundary(finishReservation),
  ],
}
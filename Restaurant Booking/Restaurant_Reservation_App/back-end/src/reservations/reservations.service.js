const knex = require("../db/connection");

// Create reservation
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((newReservation) => newReservation[0]);
}

// View reservation
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

// List reservations
function list() {
  return knex("reservations")
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
}

// List reservations on date
function listReservationsByDay(reservation_date) {
  return knex("reservations")
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .andWhere({ reservation_date })
    .orderBy("reservation_time")
}

// Update Reservation
function update(updatedReservation, transaction = knex) {
  return transaction("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

//Search by partial or full phone number
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  create,
  read,
  list,
  listReservationsByDay,
  update,
  search,
};
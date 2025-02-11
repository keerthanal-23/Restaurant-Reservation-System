const knex = require("../db/connection");

// Create table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((newTable) => newTable[0]);
}

// List tables
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name")
}

// View tables
function read(table_id) {
  return knex("tables as t")
    .leftJoin("reservations as r", "r.reservation_id", "t.reservation_id")
    .select(
      "t.table_id",
      "t.table_name",
      "t.capacity",
      "t.reservation_id",
      "r.first_name",
      "r.last_name",
      "r.mobile_number",
      "r.reservation_date",
      "r.reservation_time",
      "r.people",
      "r.status",
      "r.created_at as reservation_created",
      "r.updated_at as reservation_updated"
    )
    .where({ table_id })
    .then((result) => result[0]);
}

// View reservation
function readReservation(reservation_id) {
  return knex("reservations")
    .where({ reservation_id })
    .then((result) => result[0]);
}

// View reservation by table
function readTableByReservation(reservation_id) {
  return knex("tables")
    .where({ reservation_id })
    .whereExists(knex.select("*").from("tables").where({ reservation_id }))
    .then((result) => result[0]);
}

// Update tables
async function update(updates, transaction = knex) {
  return transaction("tables")
    .select("*")
    .where({ table_id: updates.table_id })
    .update(updates, "*")
    .then((results) => results[0]);
}

module.exports = {
  create,
  list,
  read,
  readReservation,
  readTableByReservation,
  update,
}

exports.up = function (knex) {
  return knex.schema.table("reservations", (table) => {
    table.string("status").notNullable().defaultTo("booked").alter(); // Add default to status column
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("reservations", (table) => {
    table.string("status").nullable().alter();
  });
};

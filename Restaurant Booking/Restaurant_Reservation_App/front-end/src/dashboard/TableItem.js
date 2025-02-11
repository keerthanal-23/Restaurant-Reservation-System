import React from "react";
import { finishReservation } from "../utils/api";
//import { Link } from "react-router-dom";

function TableItem({ table, onUpdateTable }) {

  const handleFinish = async () => {
    const abortController = new AbortController();

    // display confirm dialog and allow cancel
    const doesConfirm = window.confirm("Is this table ready to seat new guests? This cannot be undone");
    // return early to exit out of function if not confirmed
    if (!doesConfirm) {
      return;
    }

    const res = await finishReservation(table.table_id, abortController.signal);
    onUpdateTable(res);

    return () => abortController.abort();

  }

  return (
    // Utilizes bootstrap for style, responsiveness, and mobile/desktop compatibility
    <tr key={table.table_id}>
      <td> {table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "occupied" : "free"}
      </td>
      <td>
        {table.reservation_id ?
          <button data-table-id-finish={table.table_id} onClick={handleFinish}>
            <span className="d-none d-lg-block">Finish</span>
            <span className="d-lg-none oi oi-check"></span>
          </button>
          : null}
      </td>
    </tr>
  )
}

export default TableItem;
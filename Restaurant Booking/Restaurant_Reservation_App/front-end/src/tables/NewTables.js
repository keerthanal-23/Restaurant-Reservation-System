import { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../Errors/ErrorAlert";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";


function NewTablePage() {
  let history = useHistory();

  const initialTableState = {
    table_name: '',
    capacity: '',
  };

  const [table, setTable] = useState({ ...initialTableState })
  const [tableErrors, setTableErrors] = useState([]);

  // Table Form Validation
  const getFormErrors = () => {
    const tableErrors = []

    // Check if table name is at least 2 characters
    if (table.table_name.length < 2) {
      tableErrors.push({ message: `Table name must be at least 2 characters` })
    }

    //Check if capacity is at least 1
    if (table.capacity < 1) {
      tableErrors.push({ message: `Table capacity must be at least 1` })
    }
    return tableErrors
  }

  // Handle create table
  const handleCreateTable = async () => {
    const abortController = new AbortController();

    try {
      const errors = getFormErrors();
      if (errors.length) {
        setTableErrors(errors)
        return
      }

      await createTable(table, abortController.signal)
      setTable({ ...initialTableState })
      history.push(`/dashboard`)
    }
    catch (err) {
      setTableErrors([err])
    }

    return () => abortController.abort();

  }

  // Handle canceling create new table
  const handleCancelTable = () => {
    setTable({ ...initialTableState })
    history.goBack();
  }

  return (
    <div className="NewTable">
      <h1> New Tables</h1>

      <TableForm
        table={table}
        onTableChanged={setTable}
        onCancel={handleCancelTable}
        onSubmit={handleCreateTable}
      />
      {tableErrors.map((error) => {
        return <ErrorAlert key={error} error={error} />
      })}
    </div>
  )
}

export default NewTablePage;
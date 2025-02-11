function TableForm({
  table,
  onTableChanged,
  onSubmit,
  onCancel
}) {

  // STATE HANDLERS set state for each field on submit

  const handleTableNameChange = (event) => {
    onTableChanged({
      ...table,
      table_name: event.target.value,
    });
  };

  const handleCapacityChange = (event) => {
    onTableChanged({
      ...table,
      capacity: Number(event.target.value),
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
    <form className="table-edit" onSubmit={handleSubmitForm}>
      <div className="form-group">
        <label htmlFor="table_name">Table name</label>
        <input
          id="table_name"
          type="text"
          name="table_name"
          className="form-control"
          required
          placeholder="Table Name"
          onChange={handleTableNameChange}
          value={table.table_name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input
          id="capacity"
          type="number"
          name="capacity"
          className="form-control"
          required
          placeholder="Capacity"
          onChange={handleCapacityChange}
          value={table.capacity}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleClickCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default TableForm;
import ErrorAlert from "../Errors/ErrorAlert";
import TableItem from "./TableItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';


function TableList({ tables, tablesErrors, onUpdateTable }) {

  return (
    // Utilizes bootstrap for style, responsiveness, and mobile/desktop compatibility
    <div>
      <table className="table d-table align-middle" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr className="d-table-row">
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Table Name</span>
              <span className="d-lg-none">Name</span>
            </th>
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Capacity</span>
              <span className="d-lg-none oi oi-people"></span>
            </th>
            <th className="col d-table-cell">
              <span className="d-none d-lg-block">Status</span>
              <FontAwesomeIcon className="d-lg-none" icon={faInfo}></FontAwesomeIcon>
            </th>
            <th className="col d-table-cell">Finish</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <TableItem
              key={table.table_id}
              table={table}
              onUpdateTable={onUpdateTable}
            />
          ))}
        </tbody>
      </table>
      <ErrorAlert error={tablesErrors} />
    </div>
  )
}

export default TableList;
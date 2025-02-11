import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faInfo, faTools } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LegendModal({ handleClose, show }) {

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Legend</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <thead>
            <tr className="row">
              <th className="col">Icon</th>
              <th className="col">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="row">
              <td className="col-6">
                <span className="oi oi-clock" />
              </td>
              <td className="col-6">Time</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <span className="oi oi-people" />
              </td>
              <td className="col-6">Party Size</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>
              </td>
              <td className="col-6">Status</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <FontAwesomeIcon icon={faTools}></FontAwesomeIcon>
              </td>
              <td className="col-6">Actions/Tools</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <span className="oi oi-pencil" />
              </td>
              <td className="col-6">Edit</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <span className="oi oi-trash" />
              </td>
              <td className="col-6">Cancel/cancelled</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <span className="oi oi-book" />
              </td>
              <td className="col-6">booked</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <FontAwesomeIcon icon={faChair}></FontAwesomeIcon>
              </td>
              <td className="col-6">seated</td>
            </tr>
            <tr className="row">
              <td className="col-6">
                <span className="oi oi-check" />
              </td>
              <td className="col-6">finished</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LegendModal;
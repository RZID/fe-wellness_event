import { Modal, Button } from "react-bootstrap";
import { CheckLg, XLg } from "react-bootstrap-icons";
import dayjs from "dayjs";
const ShowDetailEvent = (props) => {
  return (
    <div>
      <Modal show={props.show} onHide={props.onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr>
                <td>Event Name</td>
                <td>:</td>
                <td>{props.data.name || null}</td>
              </tr>
              <tr>
                <td>Company</td>
                <td>:</td>
                <td>
                  {props.data.hr.name} - {props.data.hr.company}
                </td>
              </tr>
              <tr>
                <td>Vendor</td>
                <td>:</td>
                <td>
                  {props.data.vendor.name} - {props.data.vendor.company}
                </td>
              </tr>
              <tr>
                <td>Proposed Location</td>
                <td>:</td>
                <td>{props.data.proposed_location}</td>
              </tr>
              <tr>
                <td>Proposed Dates</td>
                <td>:</td>
                <td>
                  {props.data.proposed_date.map((date, i) => (
                    <p key={i} className="mb-0">
                      {dayjs(date).format("HH:mm ddd, DD-MM-YYYY")}
                    </p>
                  ))}
                </td>
              </tr>
              {props.data.date_approved && (
                <tr>
                  <td>Approved Date</td>
                  <td>:</td>
                  <td>
                    {dayjs(props.data.date_approved).format(
                      "HH:mm ddd, DD-MM-YYYY"
                    )}
                  </td>
                </tr>
              )}
              <tr>
                <td>Status</td>
                <td>:</td>
                <td
                  className={`fw-bold
                    ${
                      props.data.status.toLowerCase() === "pending"
                        ? "text-warning"
                        : props.data.status.toLowerCase() === "approve"
                        ? "text-success"
                        : props.data.status.toLowerCase() === "reject"
                        ? "text-danger"
                        : "text-primary"
                    }
                      `}
                >
                  {props.data.status}
                  {props.data.status.toLowerCase() === "reject"
                    ? props.data.remarks
                      ? ` (Reason : ${props.data.remarks})`
                      : ""
                    : ""}
                </td>
              </tr>
            </tbody>
          </table>

          {props.role.toLowerCase() === "vendor" &&
            props.data.status.toLowerCase() === "pending" && (
              <div className="d-flex justify-content-end">
                <Button
                  variant="danger"
                  className="me-3 d-flex align-items-center"
                  onClick={() => props.onConfirmEvent(props.data, false)}
                >
                  <XLg className="me-2" />
                  <span>Reject</span>
                </Button>
                <Button
                  variant="success"
                  className=" d-flex align-items-center"
                  onClick={() => props.onConfirmEvent(props.data, true)}
                >
                  <CheckLg className="me-2" />
                  <span>Approve</span>
                </Button>
              </div>
            )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShowDetailEvent;

import { Table, Button } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import dayjs from "dayjs";
const EventTable = (props) => {
  return (
    <Table hover responsive className="flex-nowrap">
      <thead className="table-dark">
        <tr>
          <th>No. </th>
          <th>Event Name</th>
          <th>Vendor Name</th>
          <th>Date (Confirmed / Proposed)</th>
          <th>Status</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.tableData.map((event, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{event.name}</td>
            <td>
              {event.vendor.name} - {event.vendor.company}
            </td>
            <td>
              {event.approved_date ? (
                <p className="text-success">
                  {dayjs(event.approved_date).format("HH:mm - ddd, DD-MM-YYYY")}
                </p>
              ) : (
                event.proposed_date.map((proposed_date, i_date) => (
                  <p
                    key={i_date}
                    className={
                      event.status.toLowerCase() === "pending"
                        ? "text-warning"
                        : ""
                    }
                  >
                    {dayjs(proposed_date).format("HH:mm - ddd, DD-MM-YYYY")}
                  </p>
                ))
              )}
            </td>
            <td
              className={`fw-bold
                    ${
                      event.status.toLowerCase() === "pending"
                        ? "text-warning"
                        : event.status.toLowerCase() === "approve"
                        ? "text-success"
                        : event.status.toLowerCase() === "reject"
                        ? "text-danger"
                        : "text-primary"
                    }
                      `}
            >
              {event.status}
            </td>
            <td>
              {dayjs(event.date_created).format("HH:mm - ddd, DD-MM-YYYY")}
            </td>
            <td>
              <Button
                size="sm"
                className="btn btn-orange"
                onClick={() => props.onShowDetailEvent(event)}
              >
                <Eye />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default EventTable;

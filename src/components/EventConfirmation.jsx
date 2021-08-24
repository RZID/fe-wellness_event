import { useState } from "react";
import {
  Modal,
  FloatingLabel,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Button
} from "react-bootstrap";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONFIRM_EVENT, GET_EVENT, DONE_RELOAD } from "../store/actions/event";

const ShowDetailEvent = (props) => {
  const dispatch = useDispatch();
  const confirmationData = useSelector((state) => state.confirmEvent);
  const [formData, setFormData] = useState({});
  const submitHandler = (event) => {
    event.preventDefault();
    const forms = {
      ...formData,
      status: props.isApprove ? "Approve" : "Reject"
    };
    dispatch(CONFIRM_EVENT(props.data._id, forms));
    props.onClose();
  };
  useEffect(() => {
    if (confirmationData.reload) {
      dispatch(GET_EVENT());
      dispatch(DONE_RELOAD());
    }
  });
  return (
    <Modal
      show={props.show}
      onHide={() => {
        setFormData({});
        props.onClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.isApprove ? "Approve" : "Reject"} Event</h5>
        <hr />
        <form action="#" onSubmit={(event) => submitHandler(event)}>
          <div className="mb-3">
            {props.isApprove ? (
              <div>
                <h6> Select date </h6>
                <ToggleButtonGroup
                  type="radio"
                  name="approved_date"
                  value={formData.approved_date}
                  onChange={(event) => setFormData({ approved_date: event })}
                >
                  {props.data.proposed_date.map((date, i) => (
                    <ToggleButton
                      id={`radio-${i}`}
                      value={date}
                      variant="outline-primary"
                      key={i}
                      size="sm"
                    >
                      {dayjs(date).format("HH:mm ddd, DD-MM-YYYY")}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
            ) : (
              <FloatingLabel controlId="floatingTextarea2" label="Reason">
                <Form.Control
                  as="textarea"
                  placeholder="Type your reason for rejecting this event"
                  onChange={(event) => {
                    setFormData({ reason: event.target.value });
                  }}
                />
              </FloatingLabel>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="success"
              disabled={!formData.approved_date && !formData.reason}
            >
              {props.isApprove ? "Approve" : "Reject"} Event
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ShowDetailEvent;

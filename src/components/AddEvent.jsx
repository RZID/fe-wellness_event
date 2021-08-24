import { Modal, FloatingLabel, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_EVENT } from "../store/actions/event";
import axios from "../helpers/axios";
import AsyncSelect from "react-select/async";

const AddEvent = (props) => {
  const dispatch = useDispatch();
  const getOptions = (query) => {
    if (query.length > 2)
      return new Promise((resolve, reject) =>
        axios("get", `vendor?where=${query}`)
          .then((res) =>
            resolve(
              res.data.data.map(({ _id, name, company }) => ({
                value: _id,
                label: `${name} - ${company}`
              }))
            )
          )
          .catch(reject)
      );
  };
  const [formData, setFormData] = useState({});
  const submitAddEvent = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      date: [formData.date_1, formData.date_2, formData.date_3]
    };
    dispatch(ADD_EVENT(data, dispatch));
    props.onClose();
    props.refreshData();
  };
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form action="" onSubmit={(e) => submitAddEvent(e)}>
          <FloatingLabel
            controlId="floatingInput"
            label="Event Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name"
              required
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  name: event.target.value
                }))
              }
            />
          </FloatingLabel>

          <AsyncSelect
            isClearable
            cacheOptions
            defaultOptions
            loadOptions={getOptions}
            className="mb-3"
            placeholder="Select Vendor"
            onChange={(event) =>
              setFormData((prevState) => ({
                ...prevState,
                vendor: event ? event.value : null
              }))
            }
            required
          />

          <FloatingLabel
            controlId="floatLocation"
            label="Location"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="location"
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  location: event.target.value
                }))
              }
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatDate1"
            label="Proposed Date 1"
            className="mb-3"
          >
            <Form.Control
              type="datetime-local"
              placeholder="date"
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  date_1: event.target.value
                }))
              }
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatDate2"
            label="Proposed Date 2"
            className="mb-3"
          >
            <Form.Control
              type="datetime-local"
              placeholder="date"
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  date_2: event.target.value
                }))
              }
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatDate3"
            label="Proposed Date 3"
            className="mb-3"
          >
            <Form.Control
              type="datetime-local"
              placeholder="date"
              onChange={(event) =>
                setFormData((prevState) => ({
                  ...prevState,
                  date_3: event.target.value
                }))
              }
              required
            />
          </FloatingLabel>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="success">
              Add Event
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEvent;

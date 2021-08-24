import { Toast } from "react-bootstrap";
const ToastMessage = (props) => {
  console.log();
  return (
    <div className="fixed-bottom d-flex justify-content-end me-3 mb-3">
      <Toast
        className=""
        show={props.show}
        onClose={props.onClose}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {props.data.isError ? "Oops!" : "Success!"}
          </strong>
        </Toast.Header>
        <Toast.Body>{props.data.message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastMessage;

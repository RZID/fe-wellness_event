import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <Spinner />
      <h3>Please Wait...</h3>
    </div>
  );
};
export default Loading;

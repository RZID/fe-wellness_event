import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { GET_EVENT, CLOSE_TOAST } from "../store/actions/event";
import { useSelector, useDispatch } from "react-redux";
import EventTable from "../components/EventTable";
import ModalAddEvent from "../components/AddEvent";
import ModalDetailEvent from "../components/ShowDetailEvent";
import ModalConfirm from "../components/EventConfirmation";
import ToastMessage from "../components/ToastMessage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dispatchEvent = () => dispatch(GET_EVENT());

  const userData = useSelector((state) => state.auth.userData);
  const eventData = useSelector((state) => state.event);
  const addEventData = useSelector((state) => state.addEvent);
  const confirmEventData = useSelector((state) => state.confirmEvent);

  const closeAllToast = () => {
    dispatch(CLOSE_TOAST());
  };

  // Will run on mount
  useEffect(dispatchEvent, [dispatch]);

  const [modalEvent, setModalEventData] = useState({ show: false });
  const [modalAdd, setModalAdd] = useState(false);
  const [modalConfirm, setModalConfirmData] = useState({ show: false });

  const showDetailEvent = (data) => setModalEventData({ show: true, data });
  const showApproveEvent = (data, isApprove) => {
    setModalConfirmData({ data, isApprove, show: true });
    setModalEventData({ show: false });
  };

  return (
    <div>
      <Navbar isLoggedin={true} name={userData.name} />
      {modalEvent.data ? (
        <ModalDetailEvent
          show={modalEvent.show}
          onClose={() => setModalEventData({ show: false })}
          onConfirmEvent={(data, isApprove) =>
            showApproveEvent(data, isApprove)
          }
          data={modalEvent.data}
          role={eventData.role}
        />
      ) : (
        ""
      )}
      <div className="container text-dinpro">
        {eventData.isLoading ? (
          <div>
            <div>Is loading!</div>
          </div>
        ) : (
          <div>
            {eventData.role.toLowerCase() === "vendor" && (
              <ModalConfirm
                data={modalConfirm.data}
                isApprove={modalConfirm.isApprove}
                show={modalConfirm.show}
                onClose={() => setModalConfirmData({ show: false })}
              />
            )}
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0">{eventData.role} Admin Dashboard</h3>
              {eventData.role === "HR" ? (
                <div>
                  <ModalAddEvent
                    show={modalAdd}
                    refreshData={() => dispatchEvent()}
                    onClose={() => setModalAdd(false)}
                  />
                  <button
                    type="button"
                    className="btn btn-orange"
                    onClick={() => setModalAdd(true)}
                  >
                    + Add event
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <EventTable
                tableData={eventData.data}
                onShowDetailEvent={showDetailEvent}
              />
            </div>
          </div>
        )}
      </div>
      <ToastMessage
        onClose={closeAllToast}
        data={
          addEventData.toast
            ? {
                isError: addEventData.isError,
                message: addEventData.message
              }
            : confirmEventData.toast
            ? {
                isError: confirmEventData.isError,
                message: confirmEventData.message
              }
            : eventData.toast
            ? {
                isError: eventData.isError,
                message: eventData.message
              }
            : "Oops, Error"
        }
        show={
          addEventData.toast || confirmEventData.toast || eventData.toast
            ? true
            : false
        }
      />
    </div>
  );
};

export default Dashboard;

import React from "react";
import TickIcon from "./TickIcon";

function SuccessModal({ message }) {
    const closeModalRef = React.createRef();
    const clearMessages = async () => {
        await closeModalRef.current.click();
    };
    return (
        <div
            class="modal fade"
            id="successmodal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div data-bs-dismiss="modal" ref={closeModalRef}></div>

            <div
                style={{ borderRadius: "10px", border: "0" }}
                class="modal-dialog  modal-dialog-centered  modal-dialog-scrollable "
            >
                <div
                    class="modal-content container "
                    style={{
                        background: "#f5f5f5",
                    }}
                >
                    <div class="modal-body my-4 d-flex justify-content-center align-items-center flex-column">
                        <TickIcon />
                        <h2 className="text-center my-3">{message}</h2>
                        <button
                            className="btn btn-outline-primary mt-3"
                            onClick={() => clearMessages()}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessModal;

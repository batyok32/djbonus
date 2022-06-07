import React from "react";
import "./alert.css";

function TickIcon() {
    return (
        <>
            <ul class="swal2-progress-steps d-none"></ul>
            <div
                class="swal2-icon swal2-success swal2-icon-show "
                style={{ display: "flex" }}
            >
                <div class="swal2-success-circular-line-left "></div>
                <span class="swal2-success-line-tip"></span>{" "}
                <span class="swal2-success-line-long"></span>
                <div class="swal2-success-ring"></div>{" "}
                <div class="swal2-success-fix "></div>
                <div class="swal2-success-circular-line-right "></div>
            </div>
        </>
    );
}

export default TickIcon;

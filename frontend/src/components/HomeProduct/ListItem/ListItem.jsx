import React, { useState } from "react";
import miniLogo from "../../../images/mini-logo.svg";

function ListItem({ data }) {
    const { name, description } = data;
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className="product-item user-select-none d-flex align-items-center justify-content-between my-2"
                role="button"
                onClick={() => setOpen(!open)}
            >
                <div className="product-item-left d-flex align-items-center">
                    <img src={miniLogo} alt="" />
                    <span className="ms-3" style={{ fontWeight: "500" }}>
                        {name}
                    </span>
                </div>

                <div className="product-item-right">
                    <i
                        class={`bi ${
                            open ? "bi-arrow-up-short" : "bi-arrow-down-short"
                        } fs-4`}
                    ></i>
                </div>
            </div>
            {open ? (
                <p className="product-item-description px-2">{description}</p>
            ) : (
                ""
            )}
        </>
    );
}

export default ListItem;

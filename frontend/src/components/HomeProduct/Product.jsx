import React from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem/ListItem";

function Product({ name, price, listItems }) {
    return (
        <div className="product-container my-2 my-lg-0">
            <div className="product  shadow-lg">
                <div className="product-top p-4">
                    <h3 className="text-center">{name}</h3>
                </div>
                <div className="product-bottom p-3">
                    <h4 className="text-center">{price} manat</h4>
                    {listItems.map((listItem, index) => (
                        <>
                            <hr />
                            <ListItem data={listItem} key={index} />
                        </>
                    ))}
                </div>
                <div className="d-flex justify-content-center ">
                    <Link
                        to="/cart"
                        className="text-decoration-none text-black"
                    >
                        <button className="btn outbtn mb-3">
                            {" "}
                            <i class="bi bi-basket fs-5"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Product;

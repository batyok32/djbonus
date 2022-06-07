import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Product from "../components/HomeProduct/Product";
import { useDispatch, useSelector } from "react-redux";
import { load_tarifs } from "../redux/actions/main";
import { selectTarifs } from "../redux/selectors/main";

const listItems = [
    [
        {
            name: "Telefon ekran goraýjysy",
            desc: "Islendik öz telefonyňyza 9D aýna görnüşli telefon ekran goraýjysyny goýdurmak mugt. (2X)",
        },
        {
            name: "Duhy arzanladaşyk",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş duhylaryna 10% çenli arzanladaşyk.",
        },
        {
            name: "Egin-eşik",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
    ],
    [
        {
            name: "Telefon ekran goraýjysy",
            desc: "Islendik öz telefonyňyza 9D aýna görnüşli telefon ekran goraýjysyny goýdurmak mugt. (4X)",
        },
        {
            name: "Duhy arzanladaşyk",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş duhylaryna 15% çenli arzanladaşyk.",
        },
        {
            name: "Egin-eşik",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 15% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Telefon aksesuar",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Taksi",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Internet kömekçisi (VPN)",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Telefon arassalamak (proşiwka)",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Terjime merkezi",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Azyk haryt (magazyn)",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Dermanhana",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
        {
            name: "Restoran",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
    ],
    [
        {
            name: "Telefon ekran goraýjysy-3",
            desc: "Islendik öz telefonyňyza 9D aýna görnüşli telefon ekran goraýjysyny goýdurmak mugt. (4X)",
        },
        {
            name: "Duhy arzanladaşyk-3",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş duhylaryna 10% çenli arzanladaşyk.",
        },
        {
            name: "Egin-eşik-3",
            desc: "Biz bilen işleşýän magazynlarymyzdan islendik görnüş egin-eşigi 10% arzanladyşyk bilen alyp bilersiňiz.",
        },
    ],
];

const mapState = (state) => ({
    tarifs: selectTarifs(state),
});

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { tarifs } = useSelector(mapState);
    useEffect(() => {
        setIsLoading(true);
        // Getting search configs for backend
        dispatch(load_tarifs()).then((res) => {
            setIsLoading(false);
            console.log("GOT TARIFS", tarifs);
        });
    }, []);

    return (
        <div>
            <div className="welcome bg-primary text-center py-5 w-100">
                <div className="welcome-container text-white">
                    <h1 className=" display-1 fw-bolder">
                        Aňsat durmuş.
                        <br />
                        Gowy ýaşaýyş.
                        <br />
                        Uzak gatnaşyk.
                    </h1>
                    <p className="p-3">
                        Biz size durmuşyňyza ýeňillikler we ökiden hem sada
                        ýaşaýyşyň syryny aýdyň açyp berýäris. <br />{" "}
                        <strong className="fs-5">
                            {" "}
                            Geliň siz hem bize goşulyň!
                        </strong>
                    </p>
                </div>
            </div>
            <div className="container my-5">
                <div className="row row-cols-2 row-cols-lg-4 m-0">
                    <div className="score-item d-flex align-items-center flex-column ">
                        <h1 className="">5</h1>
                        <p>Biz bilen iş alyp barýanlar</p>
                    </div>
                    <div className="score-item d-flex align-items-center flex-column ">
                        <h1>3</h1>
                        <p>Jemi bukjalaň sany</p>
                    </div>
                    <div className="score-item d-flex align-items-center flex-column ">
                        <h1>100</h1>
                        <p>Jemi ulanyjy sany</p>
                    </div>
                    <div className="score-item d-flex align-items-center flex-column ">
                        <h1>100%</h1>
                        <p>Ynamdarlyk</p>
                    </div>
                </div>
            </div>
            <div className="products my-5" id="bukjalar">
                <h1 className=" text-center my-5 ">Bukja gornusleri </h1>
                <div className="container">
                    <div className="row row-cols-1 row-cols-lg-3 m-0">
                        {Array.isArray(tarifs) &&
                            tarifs.length >= 1 &&
                            tarifs.map((tarif) => (
                                <Product
                                    key={tarif?.id}
                                    name={tarif?.name}
                                    price={tarif?.price}
                                    listItems={tarif.features}
                                />
                            ))}
                    </div>
                </div>
            </div>

            <div className="start-today" id="contact">
                <div className="start-top"></div>
                <div className="start-middle text-center py-5">
                    <h1>Start building today</h1>
                    <p>
                        Sign up now and you'll be up and running on DigitalOcean
                        in just minutes.
                    </p>
                    <button className="btn btn-white px-4 ">
                        Sign up to get started
                    </button>
                </div>
            </div>
            <div className="footer-top"></div>
        </div>
    );
}

export default Home;

{
    /* <Product */
}
//     name={"Student bukja"}
//     price={100}
//     listItems={listItems[1]}
//     desc={""}
// />
// <Product
//     name={"Pensioner bukja"}
//     price={60}
//     listItems={listItems[2]}
//     desc={""}
// />

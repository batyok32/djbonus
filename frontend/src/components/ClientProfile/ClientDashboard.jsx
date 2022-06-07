import React from "react";
import { useSelector } from "react-redux";

const mapState = (state) => ({
    auth: state.auth,
});

function ClientDashboard() {
    const { auth } = useSelector(mapState);
    return (
        <div>
            {auth && auth?.profile?.tarif ? (
                <>
                    <h2 className="text-ocean my-4 ">
                        Tarif - {auth && auth?.profile?.tarif}
                    </h2>
                    <hr />
                    {auth?.profile?.features.map((feature) => (
                        <div className="text-ocean">
                            <h5>{feature.name}</h5>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <h2 className="text-ocean my-4 ">Tarif Ýok</h2>
                    <hr />
                </>
            )}
        </div>
    );
}

export default ClientDashboard;

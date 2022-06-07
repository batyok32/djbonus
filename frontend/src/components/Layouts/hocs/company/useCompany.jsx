import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useCompany = () => {
    const userType = useSelector(({ auth }) => auth?.user?.type);
    const history = useHistory();

    useEffect(() => {
        if (userType !== "COMPANY") {
            history.push("/");
        }
    }, [userType, history]);
    return true;
};

export default useCompany;

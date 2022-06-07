import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useClient = () => {
    const userType = useSelector(({ auth }) => auth?.user?.type);
    const history = useHistory();

    useEffect(() => {
        if (userType !== "CLIENT") {
            history.push("/login");
        }
    }, [userType, history]);
    return true;
};

export default useClient;

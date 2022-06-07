import useClient from "./useClient";

const WithClient = (props) => useClient(props) && props.children;

export default WithClient;

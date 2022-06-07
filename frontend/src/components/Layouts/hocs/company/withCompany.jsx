import useCompany from "./useCompany";

const WithCompany = (props) => useCompany(props) && props.children;

export default WithCompany;

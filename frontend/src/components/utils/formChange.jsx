export const inputChange = ({ setFormData, formData }, e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

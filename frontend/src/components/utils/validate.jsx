import formErrors from "../../redux/messages/formErrors.json";

export function validateRegisterInfo(values) {
    let errors = {};
    if (!values.username.trim()) {
        errors.username = formErrors.usernameError;
    }

    if (!values.password.trim()) {
        errors.password = formErrors.passwordError;
    }
    if (values.password !== values?.password2) {
        errors.password2 = formErrors.password2passwordError;
    }
    if (!values.password2.trim()) {
        errors.password2 = formErrors.password2Error;
    }
    if (!values.full_name.trim()) {
        errors.full_name = formErrors.usernameError;
    }
    if (!values?.phoneNumber) {
        errors.phoneNumber = formErrors.phoneNumber;
    } else if (
        values?.phoneNumber <= 99361000000 ||
        values?.phoneNumber >= 99365999999
    ) {
        errors.phoneNumber = formErrors.phoneNumber2;
    }
    if (values?.email) {
        if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = formErrors.usernameError;
        }
    }
    if (!values?.email) {
        errors.email = formErrors.usernameError;
    }

    return errors;
}

export function validateLoginInfo(values) {
    let errors = {};
    if (!values.username.trim()) {
        errors.username = formErrors.usernameError;
    }

    if (!values.password.trim()) {
        errors.password = formErrors.passwordError;
    }
    return errors;
}

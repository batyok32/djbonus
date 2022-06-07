import { LOAD_TARIFS } from "../types/types";

const initialState = {
    tarifs: null,
};

export default function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_TARIFS:
            return {
                ...state,
                tarifs: payload,
            };

        default:
            return state;
    }
}

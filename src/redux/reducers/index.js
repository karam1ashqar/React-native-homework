import { ActionTypes } from "../actions";

export const product = (state = 
    {
        data: [],
        cart: [],
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS:
            return {...state, data: action.data};
        case ActionTypes.ADD_TO_CART:
            return {...state, cart: [...state.cart, action.data]};
        default:
            return state;
    }
}

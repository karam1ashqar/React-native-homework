import * as data from '../../data/products.json';
import * as _ from 'lodash';

export const ActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    LOAD_PRODUCTS: 'LOAD_PRODUCTS'
};

const loadData = (dispatch, data, actionSuccess, categoryId) => {
    let modifiedData;
    if( categoryId ) {
        modifiedData = _.get(data, `default.categories[${categoryId}]`)
    } else {
        modifiedData = _.get(data, 'default.categories');
    }
    dispatch(fetchDataSuccess(actionSuccess, modifiedData))
}

const fetchDataSuccess = (type, data) => ({
    type,
    data
});

export const loadProducts = (categoryId, dispatch) => {
    return loadData(dispatch, data,
        ActionTypes.LOAD_PRODUCTS,
        categoryId);

}

export const addToCart = (productId, categoryId, dispatch) => {
    return dispatch({
        type: ActionTypes.ADD_TO_CART,
        data: {productId, categoryId}
    })
}

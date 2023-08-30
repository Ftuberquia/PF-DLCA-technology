import axios from 'axios';

export function getDbProducts() {
    return async function (dispatch) {
        const allData = await axios.get('/dbproducts')
        return dispatch({ type: 'GET_DBPRODUCTS', payload: allData.data })
    }
};

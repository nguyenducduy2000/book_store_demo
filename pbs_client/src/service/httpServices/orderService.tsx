import httpRequest from '../../utils/httpRequest';

export default {
    getOrderItem: () => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'GET',
            url: `/cart`,
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    getCartHeader: () => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'GET',
            url: `/cart/header`,
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    addCartItem: (bookId: number) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'POST',
            url: `/cart/create`,
            data: {
                bookId: bookId,
            },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    updateCartItem: (bookId: number, quantity: number) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'PUT',
            url: `/cart/update`,
            data: {
                bookId: bookId,
                quantity: quantity,
            },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    deleteCartItem: (bookId: number) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'DELETE',
            url: `/cart/delete`,
            data: {
                bookId: bookId,
            },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    checkout: (data: object) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'PUT',
            url: `/order/checkout`,
            data: data,
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },
};

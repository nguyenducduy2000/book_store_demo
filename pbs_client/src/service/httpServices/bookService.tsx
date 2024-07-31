import httpRequest from '../../utils/httpRequest';

export default {
    home: () => {
        const options = {
            method: 'GET',
            url: '/',
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    getLatestBooks: () => {
        const options = {
            method: 'GET',
            url: '/books/latest',
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    getBook: (id: string | any | undefined) => {
        const options = {
            method: 'GET',
            url: `/books/${id}`,
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    create: (data: Object<any> | object | any) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'POST',
            url: '/books/create',
            data,
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    update: (bookId: string | any | undefined, data: Object<any> | any) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'PUT',
            url: '/books/edit',
            data: {
                id: bookId,
                ...data,
            },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    delete: (bookId: number | undefined) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'DELETE',
            url: '/books/delete',
            data: {
                id: bookId,
            },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },
};

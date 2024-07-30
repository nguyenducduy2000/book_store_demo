import httpRequest from '../../utils/httpRequest';

export default {
    index: async () => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'GET',
            url: '/user',
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    update: async (data: object) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'PUT',
            url: '/user/edit',
            data: data,
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },
};

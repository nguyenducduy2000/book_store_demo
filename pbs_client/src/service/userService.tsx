import httpRequest from '../utils/httpRequest';

export default {
    index: () => {
        return httpRequest('/', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            method: 'GET',
            url: '/',
        })
            .then((res) => {
                const data = res.data;
                // console.log(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};

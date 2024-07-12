import httpRequest from '../utils/httpRequest';

export default {
    login: (email: string, password: string) => {
        const options = {
            method: 'POST',
            url: '/login',
            data: {
                email,
                password,
            },
        };
        return httpRequest(options)
            .then((res) => {
                const data = res.data;
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
};

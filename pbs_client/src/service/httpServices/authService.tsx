import httpRequest from '../../utils/httpRequest';

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
        return httpRequest(options).then((res) => {
            const data = res.data;
            console.log(data);
            return data;
        });
    },

    register: (username: string, email: string, password: string) => {
        const options = {
            method: 'POST',
            url: '/register',
            data: {
                username,
                email,
                password,
            },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            console.log(data);
            return data;
        });
    },
};

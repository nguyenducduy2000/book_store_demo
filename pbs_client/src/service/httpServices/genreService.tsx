import httpRequest from '../../utils/httpRequest';

export default {
    index: () => {
        const options = {
            method: 'GET',
            url: '/genres',
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },

    displayBookGenre: (genreId: string | any, page: number | any) => {
        const options = {
            method: 'GET',
            url: `/genres/${genreId}`,
            params: { page },
        };
        return httpRequest(options).then((res) => {
            const data = res.data;
            // console.log(data);
            return data;
        });
    },
};

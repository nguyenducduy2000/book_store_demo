import dayjs from 'dayjs';

export default {
    currencyFormat: (num: number | any) => {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },

    convertISOToObject: (isoString: string | any) => {
        const dayjsObject = dayjs(isoString);

        return {
            $L: dayjsObject.locale(),
            $d: dayjsObject.toISOString(),
            $y: dayjsObject.year(),
            $M: dayjsObject.month(),
            $D: dayjsObject.date(),
            $W: dayjsObject.day(),
            $H: dayjsObject.hour(),
            $m: dayjsObject.minute(),
            $s: dayjsObject.second(),
            $ms: dayjsObject.millisecond(),
            $x: {}, // This is usually internal and can be left as an empty object
            $isDayjsObject: true,
        };
    },
};

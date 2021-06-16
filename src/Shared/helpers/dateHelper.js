
const dateHelper = {
    /**
     * Converts a unix time stamp to date string
     * @returns string
     */
     getDateFromUts(uts, format = 'd-m-y') {
        if(!uts) return '';
        let date = new Date(uts);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return format.replace('y', year).replace('m', month).replace('d', day);
    },

    getDaysLeft(uts) {
        let diff = uts - Date.now();
        let daysLeft = diff/1000/60/60/24;
        return daysLeft;
    }

}

export default dateHelper;

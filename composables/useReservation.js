import moment from "moment";
import { useSearchStore } from "@/stores/search";
import { useSucursalStore } from "@/stores/sucursal";

export const useReservation = () => {
    //STORES
    const storeSearch = useSearchStore();
    const storeSucursal = useSucursalStore();

    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const oneDay = 4 * 60 * 60 * 1000;
    const newTime = currentTime + oneDay;
    const nextDay = new Date(newTime);

    const fechaFormat = (value) => {
        return moment(value).format("yyyy MMM DD");
    };

    function minimoDeDias(date, days) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    //Check if the date matches de actual date
    function checkCurrentDate(date) {
        const currentDateFormatted = fechaFormat(currentDate);
        const pickedDateFormatted = fechaFormat(date);
        return pickedDateFormatted === currentDateFormatted ? true : false;
    }

    function checkFormFilled() {
        const isGreater =
            storeSearch.datePick >= storeSearch.dateBack ? true : false;

        if (
            storeSearch.isAllFilled &&
            !checkCurrentDate(storeSearch.datePick) &&
            !checkCurrentDate(storeSearch.dateBack) &&
            !isGreater
        ) {
            return true;
        }
    }

    function domingoCerrados(domingoApertura, domingoCierre) {
        if (domingoApertura === 24 && domingoCierre === 0) {
            return [0];
        }
    }

    function getWorkingHours(openingTime, closingTime) {
        let workingHours = [];
        // con fecha queremos revisar si la fecha de retiro es hoy y sumarle horas
        for (let i = openingTime; i < closingTime; i++) {
            workingHours.push({ text: `${i}`, value: i });
        }
        return workingHours;
    }

    return {
        fechaFormat,
        minimoDeDias,
        checkCurrentDate,
        checkFormFilled,
        domingoCerrados,
        getWorkingHours,
    };
};

module.exports = {
    persistData(key, value) {
        console.log("Persisting data");
        try {
            if (JSON.parse(window.localStorage.getItem(key)) != null) {
                window.localStorage.setItem(key, JSON.stringify(value));
                return true
            } else {
                window.localStorage.setItem(key, JSON.stringify(value));
                return true
            }
        } catch (error) {
            console.log(error);
        }
    },
    getData(key) {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch (error) {

        }
    },
    removeData(key) {
        try {
            window.localStorage.removeItem(key);
            return true
        } catch (error) {
            return false
        }
    },
    setData(key, value) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            return true
        } catch (error) {
            return false
        }
    },
    eventStepperCalculator() {
        let myData = JSON.parse(window.localStorage.getItem("event"));
        let stepperTotal = 3;
        if (myData.placeCheck) {
            stepperTotal = stepperTotal + 1;
        }
        if (myData.hostingCheck) {
            stepperTotal = stepperTotal + 1;
        }
        if (myData.restaurationCheck) {
            stepperTotal = stepperTotal + 1;
        }
        if (myData.tmsCheck) {
            stepperTotal = stepperTotal + 1;
        }
        return stepperTotal
    }
}
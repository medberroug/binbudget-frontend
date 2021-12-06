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
    eventNextStep(add) {
        try {

            let myData = JSON.parse(window.localStorage.getItem("event"));
            if (myData.whereIamName == "place") {
                if (myData.hostingCheck) {
                    if (add) {
                        myData.whereIamName = "hosting"
                        myData.whereIam = myData.whereIam + 1
                        window.localStorage.setItem("event", JSON.stringify(myData));
                    }
                    return "Hotel (ou hébergement)"
                } else
                    if (myData.restaurationCheck) {
                        if (add) {
                            myData.whereIamName = "restauration"
                            myData.whereIam = myData.whereIam + 1
                            window.localStorage.setItem("event", JSON.stringify(myData));
                        }
                        return "Services de restauration"
                    } else
                        if (myData.tmsCheck) {
                            if (add) {
                                myData.whereIamName = "tms"
                                myData.whereIam = myData.whereIam + 1
                                window.localStorage.setItem("event", JSON.stringify(myData));
                            }
                            return "Système de gestion des tickets"
                        } else {
                            if (add) {
                                myData.whereIamName = "service"
                                myData.whereIam = myData.whereIam + 1
                                window.localStorage.setItem("event", JSON.stringify(myData));
                            }
                            return "Autre Services"
                        }
            } else if (myData.whereIamName == "hosting") {
                if (myData.restaurationCheck) {
                    if (add) {
                        myData.whereIamName = "restauration"
                        myData.whereIam = myData.whereIam + 1
                        window.localStorage.setItem("event", JSON.stringify(myData));
                    }
                    return "Services de restauration"
                } else
                    if (myData.tmsCheck) {
                        if (add) {
                            myData.whereIamName = "tms"
                            myData.whereIam = myData.whereIam + 1
                            window.localStorage.setItem("event", JSON.stringify(myData));
                        }
                        return "Système de gestion des tickets"
                    } else {
                        if (add) {
                            myData.whereIamName = "service"
                            myData.whereIam = myData.whereIam + 1
                            window.localStorage.setItem("event", JSON.stringify(myData));
                        }
                        return "Autre Services"
                    }
            } else if (myData.whereIamName == "restauration") {
                if (myData.tmsCheck) {
                    if (add) {
                        myData.whereIamName = "tms"
                        myData.whereIam = myData.whereIam + 1
                        window.localStorage.setItem("event", JSON.stringify(myData));
                    }
                    return "Système de gestion des tickets"
                } else {
                    if (add) {
                        myData.whereIamName = "service"
                        myData.whereIam = myData.whereIam + 1
                        window.localStorage.setItem("event", JSON.stringify(myData));
                    }
                    return "Autre Services"
                }
            } else if (myData.whereIamName == "tms") {

                if (add) {
                    myData.whereIamName = "service"
                    myData.whereIam = myData.whereIam + 1
                    window.localStorage.setItem("event", JSON.stringify(myData));
                }
                return "Autre Services"

            } else if (myData.whereIamName == "service") {
                if (add) {
                    myData.whereIamName = "terminer"
                    myData.whereIam = myData.whereIam + 1
                    window.localStorage.setItem("event", JSON.stringify(myData));
                }
                return "Terminer"
            }
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
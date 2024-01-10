class TrainSearch {
    constructor(userName, password,origin,destination,date) {
        this.clickOnLogOut();
        this.clickOnLogIn(userName, password);
        this.enterAndSubmitCredentials(userName, password)
        this.enterOriginDestination(origin,destination);
        this.enterDate(date)
        this.clickOnSearch();
    }

    enterAndSubmitCredentials(username, password) {
        this.enterUserName(username);
        this.enterPassword(password);
        this.getAndEnterCaptcha();
        this.submitTheDetails();
        this.closeThePopUp()
    }

    clickOnLogOut() {
        let logOutElement = document.getElementsByClassName('search_btn loginText ng-star-inserted')[0];
        if(logOutElement.textContent === "LOGOUT"){
            logOutElement.click();
        }
    }

    clickOnLogIn() {
        let logInElement = document.getElementsByClassName('search_btn loginText ng-star-inserted')[0];
        logInElement.click();
    }

    enterOriginDestination(origin, destination) {
        this.enterOrigin(origin);
        this.enterDestination(destination)
    }

    enterUserName(username) {
        let userNameElement = document.querySelector('input[placeHolder="User Name"]');
        userNameElement.focus();
        userNameElement.value = username;
        userNameElement.dispatchEvent(new Event('input'));
    }

    enterPassword(password) {
        let passwordElement = document.querySelector('input[placeHolder="Password"]');
        passwordElement.focus();
        passwordElement.value = password;
        passwordElement.dispatchEvent(new Event('input'));
    }

    enterOrigin(origin) {
        let originInputElement = document.querySelector('#origin span input');
        originInputElement.focus();
        originInputElement.value = origin;
        originInputElement.dispatchEvent(new Event('input'));
    }

    enterDestination(destination) {
        let destInputElement = document.querySelector('#destination span input');
        destInputElement.focus();
        destInputElement.value = destination;
        destInputElement.dispatchEvent(new Event('input'));
    }

    enterDate(date) {
        let destInputElement = document.querySelector('#jDate span input');
        destInputElement.focus();
        destInputElement.value = date;
        destInputElement.dispatchEvent(new Event('input'));
        destInputElement.blur();
    }

    getAndEnterCaptcha() {
        let captcha = this.getCaptcha();
        this.enterCaptcha(captcha);
    }
    getCaptcha() {
        return "1234";
    }

    submitTheDetails() {
        let submitButtonElement = document.getElementsByClassName("search_btn train_Search")[1];
        submitButtonElement.click();
    }

    enterCaptcha(captcha) {
        let submitButtonElement = document.getElementById("captcha");
        submitButtonElement.focus();
        submitButtonElement.value = captcha;
        submitButtonElement.dispatchEvent(new Event('input'));
    }

    closeThePopUp() {
        let closeElement = document.querySelector('#login_header_disable div > div > div:nth-child(2) > a');
        closeElement.click();
    }

    clickOnSearch() {
        let submitButtonElement = document.getElementsByClassName("search_btn train_Search")[0];
        submitButtonElement.click();
    }
}

logInPage = new TrainSearch
(
    "pnk2255",
    "Uncharted@123",
    'KSR BENGALURU - SBC',
    'TANUKU - TNKU',
    '13/01/2024'
);
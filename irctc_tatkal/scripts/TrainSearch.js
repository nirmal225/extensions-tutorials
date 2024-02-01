class TrainSearch {
    async startSearch(userName, password, origin, destination, date) {
        this.clickOnLogOut();
        this.clickOnLogIn(userName, password);
        await this.enterAndSubmitCredentials(userName, password)
        this.enterOriginDestination(origin,destination);
        this.enterDate(date)
        this.clickOnSearch();
    }

    async enterAndSubmitCredentials(username, password) {
        this.enterUserName(username);
        this.enterPassword(password);
        await this.getAndEnterCaptcha();
        this.submitTheDetails();
        // this.closeThePopUp()
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

    async getAndEnterCaptcha() {
        await pause(1000)
        let captcha = await this.getCaptcha();
        await this.enterCaptcha(captcha);
    }
    async getCaptcha() {
        let src = document.getElementsByClassName('captcha-img')[0].src.replace("data:image/jpg;base64,","");
        const response = await fetch('http://127.0.0.1:5000/captcha?encodedData='+src,)
        const data = await response.json()
        return data.captcha
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

async function run() {
    let logInPage = new TrainSearch();
    await logInPage.startSearch(
        "pnk2255",
        "Uncharted@123",
        'KSR BENGALURU - SBC',
        'BAPATLA - BPP',
        '13/01/2024'
    )
}

async function pause(millisecs){
    await new Promise(r => setTimeout(r, millisecs));
}

run().catch(console.log)
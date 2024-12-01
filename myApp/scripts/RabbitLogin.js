class Rabbit {
    async login(userName, password) {
        if (this.checkForLoginPage()) {
            this.enterUserName(userName);
            this.enterPassword(password);
            this.clickOnSubmit();
            await this.clickOnQueueNames()
        }
    }

    enterUserName(username) {
        let usernameElm = document.querySelector('input[name="username"]')
        usernameElm.focus()
        usernameElm.value = username
        usernameElm.dispatchEvent(new Event('input'))
    }

    enterPassword(password) {
        let passwordElm = document.querySelector('input[name="password"]');
        passwordElm.focus()
        passwordElm.value = password
        passwordElm.dispatchEvent(new Event('input'))
    }

    clickOnSubmit() {
        let submitElm = document.querySelector('input[type="submit"]');
        submitElm.click();
    }

    async clickOnQueueNames() {
        await pause(200);
        let queueNamesElm = document.querySelector('a[href="#/queues"]');
        queueNamesElm.click();
    }

    checkForLoginPage() {
        return document.getElementById("login-status") !== null
    }
}

async function run() {
    let rabbit = new Rabbit();
    let userName = "probe";
    let password = "secret";
    await rabbit.login(userName, password)
}

async function pause(millisecs) {
    await new Promise(r => setTimeout(r, millisecs));
}

console.log("reached")

run().catch(console.log)
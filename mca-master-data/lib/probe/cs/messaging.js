let port = browser.runtime.connect();
let inbox = null;

port.onMessage.addListener(function(msg){
    inbox = msg;
});
async function sendSynchronousMessage(msg, timeOutMs = 30*1000){
    port.postMessage(msg);
    let startTimeMs = new Date().getTime();
    while(!isTimeout(startTimeMs, timeOutMs)){
        if(inbox) {
            return (readInbox());
        } else {
            console.log("waiting for response from background script for msg = " + JSON.stringify(msg));
            await pause(1000);
        }
    }
    throw new Error("TIMEOUT");
}

function readInbox() {
    let msg = inbox;
    inbox = null;
    return msg;
}
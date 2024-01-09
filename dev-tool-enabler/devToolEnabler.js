browser.runtime.onMessage.addListener(async function (request) {
    // console.log('msg received by BG : ' + JSON.stringify(request));
    return await bgMsgHandler(request).catch(currentDownloadReset);
});
async function pause(millisecs){
    await new Promise(r => setTimeout(r, millisecs));
}
function arrayBufferToString(buffer) {
    let byteArray = new Uint8Array(buffer);
    // console.log(byteArray.length);//5
    // console.log(byteArray.BYTES_PER_ELEMENT);//1
    // console.log(byteArray.byteLength);//5
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
}

function stringToArrayBuffer(str) {
    let buffer = new ArrayBuffer(str.length); //Uint8Array needs 1 byte per character as confirmed in arrayBufferToString
    let bufferView = new Uint8Array(buffer);
    for (let i=0, strLen=str.length; i<strLen; i++){
        bufferView[i] = str.charCodeAt(i);
    }
    return bufferView;
}

function getParameterValueFromQueryString(url, paramKey) {
        let query = url.split('?')[1];
        let keyValuePairs = query.split('&');

        let targetPair =_.find(keyValuePairs, function (pair) {
            let splits = pair.split('=');
            return paramKey === decodeURIComponent(splits[0]);
        });
        return targetPair ? decodeURIComponent(targetPair.split('=')[1]) : null;
}

function isTimeout(startTimeMs, timeoutMs) {
    if(timeoutMs < 0){
        return false;
    } else {
        let currentTimeMs = new Date().getTime();
        return (currentTimeMs-startTimeMs) > timeoutMs;
    }
}

function removeNonAlphaNumericCharacters(str) {
    return str ? str.replace(/[^a-zA-Z0-9]/g,'') : "";
}

function retainOnlyNumericChars(str) {
    return str ? str.replace(/[^0-9]/g,'') : "";
}

function retainOnlyAlphaChars(str) {
    return str ? str.replace(/[^a-zA-Z]/g,'') : "";
}

function compareStr(str1, str2) {
    str1 = removeNonAlphaNumericCharacters(str1);
    str2 = removeNonAlphaNumericCharacters(str2);
    str1 = str1.toUpperCase().trim();
    str2 = str2.toUpperCase().trim();
    return str1 === str2;
}

function removeNoBreakSpace(str) {
    return str.replaceAll('\u00a0', ' ')
}
function removeUnicodeCharacters(str) {
    return str.replaceAll(/[\u{0080}-\u{FFFF}]/gu, '');
}
function removeNonAsciiChars(str) {
    //does not replace character I can type with english keyboard.
    //test
    /**
     * const p = "`~!@#$%^&*()-_=+,<.>/?;:'[{]}/|*-+.1234567890Declaration of two or more directors verifying the particulars of all members\/partners\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0-29072021";
     * console.log(p.replaceAll(/[^\x00-\x7F]/g, ''));
     * output : "`~!@#$%^&*()-_=+,<.>/?;:'[{]}/|*-+.1234567890Declaration of two or more directors verifying the particulars of all members/partners-29072021"
     * tried " and \ separately after escaping.
     */
    return str.replaceAll(/[^\x00-\x7F]/g, '');
}

function strIncludes(subject, searchStr) {
    subject = removeNonAlphaNumericCharacters(subject);
    searchStr = removeNonAlphaNumericCharacters(searchStr);
    subject = subject.toUpperCase().trim();
    searchStr = searchStr.toUpperCase().trim();
    return subject.includes(searchStr);
}

//https://bytenota.com/javascript-replace-last-occurrence-of-a-string/
function replaceLast(find, replace, string) {
    var lastIndex = string.lastIndexOf(find);

    if (lastIndex === -1) {
        return string;
    }

    var beginString = string.substring(0, lastIndex);
    var endString = string.substring(lastIndex + find.length);

    return beginString + replace + endString;
}

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
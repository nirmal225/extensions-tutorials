async function getElementBySelectorWhenVisible(selector, startingNode, timeOutMs) {
    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;

    let startTimeMs = new Date().getTime();
    while (!isTimeout(startTimeMs, timeOutMs)) {
        let element = await getElemBySelectorWhenLoaded(selector, startingNode, timeOutMs, 10);
        let style = getComputedStyle(element);
        if (style.visibility === 'visible') {
            return element;
        } else {
            await pause(10);
        }
    }
    throw new Error("TIMEOUT");
}

async function getElemByXPathWhenLoaded(xpathExpression, startingNode) {
    startingNode = startingNode ? startingNode : document;
    while (true){
        let xPathResult = document.evaluate(xpathExpression, startingNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (xPathResult.singleNodeValue) {
            return xPathResult.singleNodeValue;
        } else{
            await pause(500);
        }
    }
}

async function getElemByXPathWhenLoadedWithTimeout(xpathExpression, startingNode, timeOutMs) {
    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;

    let startTimeMs = new Date().getTime();

    while (!isTimeout(startTimeMs, timeOutMs)) {
        let xPathResult = document.evaluate(xpathExpression, startingNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (xPathResult.singleNodeValue) {
            return xPathResult.singleNodeValue;
        } else {
            await pause(500);
        }
    }
    throw new Error("TIMEOUT")
}

async function getElemBySelectorWhenLoaded(selector, startingNode, timeOutMs, intervalMs) {
    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;
    intervalMs = intervalMs ? intervalMs : 500;

    let startTimeMs = new Date().getTime();

    while (!isTimeout(startTimeMs, timeOutMs)) {
        let elements = startingNode.querySelectorAll(selector);
        if (elements.length > 0) {
            if (elements.length === 1) {
                return elements[0];
            } else {
                console.log("MULTIPLE_ELEMENTS"+ JSON.stringify(elements))
                throw new Error("MULTIPLE_ELEMENTS");
            }
        } else {
            await pause(intervalMs);
        }
    }
    throw new Error("TIMEOUT");
}

async function getElementsBySelectorWhenLoaded(selector, startingNode, timeOutMs, intervalMs) {
    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;
    intervalMs = intervalMs ? intervalMs : 500;

    let startTimeMs = new Date().getTime();
    while (!isTimeout(startTimeMs, timeOutMs)) {
        let elements = startingNode.querySelectorAll(selector);
        if (elements && elements.length > 0) {
            return elements;
        } else {
            await pause(intervalMs);
        }
    }
    throw new Error("TIMEOUT");
}

async function waitForTableBodyToLoadWithData(selector, startingNode, timeOutMs, intervalMs, noDataTextContentIndex, noDataTextContent){
    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;
    intervalMs = intervalMs ? intervalMs : 500;

    let startTimeMs = new Date().getTime();
    while (!isTimeout(startTimeMs, timeOutMs)) {
        let elements = startingNode.querySelectorAll(selector);
        if (elements && elements.length > 0 && elements[noDataTextContentIndex].textContent !== noDataTextContent) {
            return elements;
        } else {
            await pause(intervalMs);
        }
    }
    throw new Error("TIMEOUT");
}

//TODO untested function, test before consumption.
async function whichElemExists(elem1Selector, elem2Selector, timeOutMs, intervalMs) {
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;
    intervalMs = intervalMs ? intervalMs : 500;
    let startTimeMs = new Date().getTime();
    let ret = undefined;
    while (true) {
        await pause(intervalMs);
        if (isTimeout(startTimeMs, timeOutMs)) {
            break;
        }
        let elem1Elems = document.querySelectorAll(elem1Selector);
        let elem2Elems = document.querySelectorAll(elem1Selector);
        if (elem1Elems.length === 0 && elem2Elems.length === 0) {
            continue;
        }
        if (elem1Elems.length > 1 || elem2Elems.length > 1) {
            throw "MULTIPLE_ELEMENTS";
        }
        ret = elem1Elems.length === 1 ? {selector: elem1Selector, element: elem1Elems[0]}
            : {selector: elem2Selector, element: elem2Elems[0]};
    }
    return ret;
}

async function getElementWhenDisplayed(xpathExpression, startingNode) {

    while (true){
        let element = await getElemByXPathWhenLoaded(xpathExpression, startingNode);
        let style = getComputedStyle(element);
        if (style.display !== 'none') {
            return element;
        }else{
            await pause(100);
        }
    }
}

function getFirstElemIfDisplayed(selector, startingNode) {
    startingNode = startingNode ? startingNode : document;

    // return new Promise((resolve, reject) => handler(resolve, reject));
    // function handler(resolve, reject) {
    let elements = startingNode.querySelectorAll(selector);
    /*if(elements.length === 0){
        // reject({error : "NO_ELEMENT_FOUND)"});
        return false;
    }
    if(elements.length > 1){
        // reject({error : 'MULTIPLE_ELEMENTS'});
        return false;
    }*/
    let style = getComputedStyle(elements[0])
    // resolve(style.display !== 'none'? elements[0] : false);
    return style.display !== 'none' ? elements[0] : false;
    // }
}

async function getElementBySelectorWhenDisplayed(selector, startingNode, timeOutMs) {
    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 30 * 1000;

    let startTimeMs = new Date().getTime();
    while (!isTimeout(startTimeMs, timeOutMs)) {
        let element = await getElemBySelectorWhenLoaded(selector, startingNode, timeOutMs, 10);
        let style = getComputedStyle(element);
        if (style.display !== 'none') {
            return element;
        } else {
            await pause(10);
        }
    }
    throw new Error("TIMEOUT");
}

async function getSelectWhenPopulated(selector, startingNode, timeOutMs, elemIdentifier) {
    startingNode = startingNode ? startingNode : document;
    elemIdentifier = elemIdentifier ? elemIdentifier : "ELEMENT";
    timeOutMs = timeOutMs ? timeOutMs : 60 * 1000;
    let startTimeMs = new Date().getTime();
    while(!isTimeout(startTimeMs, timeOutMs)){
        let elements = startingNode.querySelectorAll(selector);
        if(elements.length === 0){
            await pause(10);
        } else {
            if (elements.length === 1) {
                if (elements[0].length > 1) {
                    return elements[0];
                }
            } else {
                console.log("MULTIPLE_ELEMENTS for element : "+ elemIdentifier);
                throw new Error("MULTIPLE_ELEMENTS");
            }
        }
    }
    console.log("TIMEOUT for element : "+ elemIdentifier);
    throw new Error("TIMEOUT");
}

function clickElement(element) {
    var clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    return element.dispatchEvent(clickEvent);
}

function mousedownElement(element) {
    var clickEvent = new MouseEvent('mousedown', {
        // view: window,
        bubbles: true,
        cancelable: true
    });
    return element.dispatchEvent(clickEvent);
}

function mouseupElement(element) {
    var clickEvent = new MouseEvent('mouseup', {
        // view: window,
        bubbles: true,
        cancelable: true
    });
    return element.dispatchEvent(clickEvent);
}

async function waitForSelectOptionByTextContent(selectId, textContent, elemIdentifier) {

    let startTimeMs = new Date().getTime();
    let timeoutMs = 30 * 1000;

    while (!isTimeout(startTimeMs, timeoutMs)) {
        let options = document.querySelectorAll('select#' + selectId + ' option');
        let target = _.find(options, function (opt) {
            return compareStr(opt.textContent, textContent);
        });
        if (target) {
            return;
        } else {
            await pause(100);
        }
    }
    console.log("TIMEOUT : SELECT DROP DOWN OPTIONS DID NOT POPULATE IN TIME : "+ elemIdentifier)
    throw new Error("TIMEOUT");
}

async function waitForSelectOptionByValue(selectId, value, elemIdentifier) {
    let startTimeMs = new Date().getTime();
    let timeoutMs = 30 * 1000;

    while (!isTimeout(startTimeMs, timeoutMs)) {
        let options =  document.querySelectorAll('select#' + selectId + ' option');
        let target = _.find(options, function (opt) {
            return compareStr(opt.value, value);
        });
        if (target) {
            return;
        } else {
            await pause(100);
        }
    }
    console.log("TIMEOUT : SELECT DROP DOWN OPTIONS DID NOT POPULATE IN TIME : "+ elemIdentifier)
    throw new Error("TIMEOUT");
}

function waitForResultOrErrorTextContent(resultSelector, errorSelector, elemIdentifier, startingNode, timeOutMs) {
    startingNode = startingNode ? startingNode : document;
    elemIdentifier = elemIdentifier ? elemIdentifier : "ELEMENT";
    timeOutMs = timeOutMs ? timeOutMs : 60 * 1000;
    return new Promise((resolve, reject) => handler(resolve, reject));

    function handler(resolve, reject) {
        let startTimeMs = new Date().getTime();
        let waitForElementTimer = setInterval(function () {
            if (isTimeout(startTimeMs, timeOutMs)) {
                clearInterval(waitForElementTimer);
                reject({error: "TIMEOUT", reason: elemIdentifier + "_NOT_AVAILABLE"});
            }
            let resultElems = startingNode.querySelectorAll(resultSelector);
            let errorElems = startingNode.querySelectorAll(errorSelector);
            if (resultElems.length === 0 && errorElems.length === 0) {
                return;
            }
            if (resultElems.length > 1 || errorElems.length > 1) {
                clearInterval(waitForElementTimer);
                reject({error: "MULTIPLE_ELEMENTS", elements: JSON.stringify(resultElems)});
            }
            if (resultElems.length === 1 && errorElems.length === 1) {
                let isResultEmpty = compareStr(resultElems[0].textContent, "");
                let isErrorEmpty = compareStr(errorElems[0].textContent, "");
                if (isResultEmpty && isErrorEmpty) {
                    return;
                }
                if (!isResultEmpty) {
                    clearInterval(waitForElementTimer);
                    resolve(resultElems[0]);
                }
                if (!isErrorEmpty) {
                    clearInterval(waitForElementTimer);
                    resolve(errorElems[0]);
                }
            }
        }, 500);
    }
}

function getElemWhenTextContentIsAvailable(selector, elemIdentifier, startingNode, timeOutMs) {
    startingNode = startingNode ? startingNode : document;
    elemIdentifier = elemIdentifier ? elemIdentifier : "ELEMENT";
    timeOutMs = timeOutMs ? timeOutMs : 60 * 1000;
    return new Promise((resolve, reject) => handler(resolve, reject));

    function handler(resolve, reject) {
        let startTimeMs = new Date().getTime();
        let waitForElementTimer = setInterval(function () {
            if (isTimeout(startTimeMs, timeOutMs)) {
                clearInterval(waitForElementTimer);
                reject({error: "TIMEOUT", reason: elemIdentifier + "_NOT_AVAILABLE"});
            }
            let elements = startingNode.querySelectorAll(selector);
            if (elements.length === 0) {
                return;
            }
            if (elements.length > 1) {
                clearInterval(waitForElementTimer);
                reject({error: "MULTIPLE_ELEMENTS", elements: JSON.stringify(elements)});
            }
            if (elements.length === 1) {
                if (compareStr(elements[0].textContent, "")) {
                    return;
                }
                clearInterval(waitForElementTimer);
                resolve(elements[0]);
            }
        }, 500);
    }
}

async function waitForInnerText(selector, innerText, startingNode, timeOutMs, intervalMs) {

    startingNode = startingNode ? startingNode : document;
    timeOutMs = timeOutMs ? timeOutMs : 60 * 1000;
    intervalMs = intervalMs ? intervalMs : 500;

    return new Promise((resolve, reject) => handler(resolve, reject));

    function handler(resolve, reject) {
        let startTimeMs = new Date().getTime();
        let waitForElementTimer = setInterval(async function () {
            if (isTimeout(startTimeMs, timeOutMs)) {
                clearInterval(waitForElementTimer);
                reject({error: "TIMEOUT"});
                return;
            }
            let elements = startingNode.querySelectorAll(selector);
            if (elements.length === 0) {
                return;
            }
            if (elements.length > 1) {
                reject({error: "MULTIPLE_ELEMENTS", elements: JSON.stringify(elements)});
                return;
            }
            if (elements[0].innerText !== innerText) {
                return;
            }
            if (elements[0].innerText === innerText) {
                resolve(elements[0]);
                return;
            }
        }, intervalMs);
    }
}

async function selectOptionByValue(cssSelectorOfSelect, valueToAssign) {
    let selectElem = await getElemBySelectorWhenLoaded(cssSelectorOfSelect);
    selectElem.value = valueToAssign;
    selectElem.dispatchEvent(new Event("change"));
}
async function selectOptionByOptionText(cssSelectorOfSelect, optionText) {
    let selectElem = await getElemBySelectorWhenLoaded(cssSelectorOfSelect);
    let selectOptionsElems = await getElementsBySelectorWhenLoaded('option', selectElem);
    let target = _.find(selectOptionsElems, function (el) {
        return el.textContent === optionText;
    });
    selectElem.value = target.value;
    selectElem.dispatchEvent(new Event("change"));
}
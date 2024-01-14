function generateEventType() {
    return 'event_' + Math.random().toString(36).substr(2, 9);
}

const getClientLatestVersionFunction = "getClientLatestVersion"

/*
export function getClientLatestVersion(param) {
    return new Promise((resolve, reject) => {
        const eventType = generateEventType();

        function handlerMessage(event) {
            window.removeEventListener(eventType, handlerMessage);
            resolve(event.detail.data);
        }

        window.addEventListener(eventType, handlerMessage);
        var req = {
            eventType: eventType,
            param: param,
            method: getClientLatestVersionFunction
        }
        window.JSBridge.postNativeMessage(req);
    });
}
*/
export function getClientLatestVersion(param) {
    return new Promise((resolve, reject) => {
        const eventType = generateEventType();

        function handlerMessage(event) {
            window.removeEventListener(eventType, handlerMessage);
            resolve(event.detail.data);
        }

        window.addEventListener(eventType, handlerMessage);
        var req = {
            eventType: eventType,
            param: param,
            method: getClientLatestVersionFunction
        }
        window.JSBridge.postMessage(req);
    });
}

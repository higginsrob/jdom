export function waitForSelector(selector: string, timeout=3000) {
    return new Promise((resolve, reject) => {
        const exists = document.querySelector(selector);
        if (exists) {
            return resolve(exists);
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                clearTimeout(timer);
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        const timer = setTimeout(() => {
            observer.disconnect();
            reject(`Timeout while waiting for selector: ${selector}`);
        }, timeout);
    });
}

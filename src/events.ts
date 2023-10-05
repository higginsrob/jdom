export function on(
    element: HTMLElement,
    event: string,
    handler: (event: Event) => void,
    options: any,
) {
    element.addEventListener(event, handler, options);
}

export function once(
    element: HTMLElement,
    event: string,
    handler: (event: Event) => void,
    options: any,
) {
    element.addEventListener(
        event,
        handler,
        Object.assign({ once: true }, options),
    );
}

export function off(
    element: HTMLElement,
    eventName: string,
    handler: (event: Event) => void,
    options: any,
) {
    element.removeEventListener(eventName, handler, options);
}

export function dispatch(element: HTMLElement, eventName: string) {
    const event = new Event(eventName);
    element.dispatchEvent(event);
}

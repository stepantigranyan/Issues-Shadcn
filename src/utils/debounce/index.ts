export const debounce = (fn: Function, delay: number) => {
    let timeout: number;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

// eslint-disable-next-line
export function format(str, param = {}) {
    return str.replace(/(\{([^}{]+?)})/g, (a, b, key) => {
        if (key in param) {
            return param[key];
        }
        return a;
    });
}

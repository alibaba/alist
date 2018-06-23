import messages from './messages';
import Rule from './rules';

class Validate {
    constructor(schema, locale = 'zh_CN') {
        this.schema = schema;
        this.setLocal(locale);
        this.keys = Object.keys(this.schema);
    }
    setLocal(locale) {
        this.messages = messages(locale);
    }
    test(value) {
        return this.keys.reduce((s, key) => s && new Rule(this.schema[key])
            .test(value[key]), true);
    }
    validate(value) {
        const ret = {};
        let hasPromise = false;
        const validatePromise = this.keys.map((key) => {
            const result = new Rule(this.schema[key]).validate(value[key], key, value);
            if (result instanceof Promise) {
                hasPromise = true;
                return result.then((res) => {
                    if (res) {
                        ret[key] = res;
                    }
                });
            }
            if (result) {
                ret[key] = result;
            }
            return null;
        });
        if (hasPromise) {
            return Promise.all(validatePromise).then(() => {
                if (Object.keys(ret).length === 0) {
                    return null;
                }
                return ret;
            });
        }
        if (Object.keys(ret).length === 0) {
            return null;
        }
        return ret;
    }
}
export default Validate;

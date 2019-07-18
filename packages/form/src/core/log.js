const log4set = (logger, set) => {
    if (logger) {
        logger.log('set', {
            set,
        });
    }
};

const log4mount = (logger, itemList) => {
    if (logger) {
        logger.log('env', {
            env: {
                components: itemList.map(item => ({
                    name: item.name,
                    label: item.label,
                    isIf: item.isIf,
                    when: typeof item.when === 'function' ? item.when.toString() : null,
                })),
            }
        });
    }
};

const log4validate = (logger, validate) => {
    if (logger) {
        logger.log('validate', {
            validate
        });
    }
};

export {
    log4set,
    log4mount,
    log4validate,
};
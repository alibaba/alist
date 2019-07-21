const log4set = (logger, eventId, set) => {
    if (logger) {
        logger.log('set', {
            set,
            eventId
        });
    }
};

const log4mount = (logger, eventId, itemList) => {
    if (logger) {
        logger.log('ui', {
            ui: {
                components: itemList.map(item => ({
                    name: item.name,
                    label: item.label,
                    isIf: item.isIf,
                    when: typeof item.when === 'function' ? item.when.toString() : null,
                })),
            },
            eventId
        });
    }
};

const log4validate = (logger, eventId, validate) => {
    if (logger) {
        logger.log('validate', {
            validate,
            eventId
        });
    }
};

export {
    log4set,
    log4mount,
    log4validate,
};
import moment from 'moment';
import genId from '../util/random';

const isValidError = (err) => {
    const index = Object.keys(err || {}).findIndex(key => err[key] !== null);
    return index !== -1;
};

class Logger {
    constructor(option) {
        this.initialize(option);
        this.lastGroupId = null;
        this.lastEventType = null;
        this.lasteSetField = null;
    }

    initialize(option) {
        const { url } = option || {};
        this.url = url;
        this.id = `logger_${genId()}`;
        this.startTime = moment();
        this.logList = [];
        this.cacheList = [];
        this.log4load();
        this.timer = null;
        const that = this;
        if (window) {
            window.addEventListener('beforeunload', (event) => {
                that.log4leave();
            });
        }
    }

    // 记录当前域名，页面名称，环境信息等
    log4load() {
        const {
            host, href, pathname, protocol, search,
        } = location;
        this.log('env', {
            env: {
                host,
                href,
                pathname,
                protocol,
                search,
                title: document && document.title,
            },
            groupId: genId(),
        });
    }

    logOnEvent(field, fnName, args) {
        this.log('event', {
            event: {
                field,
                fnName,
                args,
            },
            groupId: genId(),
        });
    }

    // 记录页面跳失
    log4leave() {
        this.log('leave');
    }

    logSet(groupId, set) {
        this.log('set', {
            set,
            groupId,
        });
    }

    logSetMultiple(groupId, setMultiple) {
        this.log('setMultiple', {
            setMultiple,
            groupId,
        });
    }

    logValidate(groupId, validate) {
        this.log('validate', {
            validate,
            groupId,
        });
    }

    logSubmit(payload) {
        return this.logTask(payload, 'submit');
    }

    logTask(payload, taskKey = 'task') {
        const { url, body } = payload;
        const data = {
            [taskKey]: {
                url,
                body: body || null,
            },
        };

        return {
            success: (result) => {
                data[taskKey].success = true;
                data[taskKey].result = result;
                this.log(taskKey, data);
            },
            error: (result) => {
                data[taskKey].success = false;
                data[taskKey].result = result;
                this.log(taskKey, data);
            },
        };
    }

    log(type, payload) {
        const now = moment();
        const log = {
            id: genId(),
            time: now.format('YYYY-MM-DD HH:mm:ss'),
            timeMS: now.valueOf(),
            duration: moment.duration(now.diff(this.startTime)).as('milliseconds'),
            type,
            payload,
        };

        // 根据分组id来判断连锁操作
        const { groupId, set } = payload || {};
        const { field, triggerType, type: setType } = set || {};

        // 集中提交
        // case1: 同一批次操作，先不发送
        let useCache = this.cacheList.length === 0; // 初次操作不应该进入判断逻辑
        if (this.lastGroupId === groupId) {
            useCache = true;
        } else if (this.lastEventType === type && type === 'set') {
            // case2: 同一操作类型，同名设置，先不发送
            if (this.lasteSetField === field) {
                useCache = true;
            }
        }

        // 避免庞大页面巨量初始化
        if (moment.duration(now.diff(this.lastTime)).as('milliseconds') < 500) {
            useCache = true;
        }

        if (type === 'set' && triggerType === 'manual' && setType === 'value') { // 用户手动输入类型
            this.lasteSetField = field;
        }

        this.lastTime = now;
        this.lastGroupId = groupId || null;
        this.lastEventType = type;

        // 命中缓存不发送请求，本地存储，降低服务器压力，针对的场景主要是频繁input修改和引起的校验，设置错误一系列动作
        if (this.timer) clearTimeout(this.timer);
        if (useCache) {
            this.cacheList.push(log);

            // 如果继续命中缓存，给定时器延时
            this.timer = setTimeout(this.commit.bind(this, null), 2000);
        } else {
            // 如果当前条目没有命中，
            this.commit(log);
        }
    }

    comboCache(cacheList) {
        const result = cacheList.filter((cacheItem, cacheIdx) => {
            let isValid = true;
            const { type, payload } = cacheItem;
            const { setMultiple, validate, set } = payload || {};
            const { groupId } = payload;

            // 跟随性的setErrors没有必要，因为validate里面已经注明了是否报错了
            const flowValidate = cacheList.findIndex(cacheItem => cacheItem && cacheItem.type === 'validate' && cacheItem.payload && cacheItem.payload.groupId === groupId) !== -1;

            switch (type) {
            case 'set':
                const { type: setType } = set;
                if (flowValidate && setType === 'error') {
                    isValid = false;
                }
                break;
            case 'setMultiple':
                const { type: setMultipleType } = setMultiple;
                if (flowValidate && setMultipleType === 'error') {
                    isValid = false;
                }
                break;
            case 'validate':
                const { success, error } = validate;
                isValid = !success && isValidError(error);
                break;
            }

            return isValid;
        });
        return result;
    }

    commit(log) {
        const comboCacheList = this.comboCache(this.cacheList);
        if (this.url) {
            // postData
            // data: this.cacheList
            this.cacheList = [];

            if (log) {
                // commit single log
            }
        } else {
            if (this.cacheList.length > 0) {
                this.logList = [...this.logList, ...comboCacheList];
                this.cacheList = [];
            }

            if (log) {
                this.logList.push(log);
            }
        }
    }
}

export default Logger;

import moment from 'moment';
import genId from '../util/random';

class Logger {
    constructor(option) {
        this.initialize(option);
    }

    initialize () {
        this.id = `logger_${genId()}`;
        this.startTime = moment();
        this.logList = [];
        this.log4load();
    }

    // 记录当前域名，页面名称，环境信息等
    log4load() {
        const { host, href, pathname, protocol, search } = location;
        this.log('load', {
            env: {
                host, href, pathname, protocol, search,
                title: document && document.title,
            },            
        });
    }

    // 记录页面跳失
    log4leave() {
        this.log('leave');
    }

    log(type, payload) {
        const now = moment();
        this.logList.push({
            id: genId(),
            time: now.format('YYYY-MM-DD HH:mm:ss'),
            duration: moment.duration(now.diff(this.startTime)).as('milliseconds'),
            type,
            payload,
        });
    }

    
}

export default Logger;

import antdEn from 'antd/lib/locale-provider/en_US';
import antdZh from 'antd/lib/locale-provider/zh_CN';
import appLocaleDataEn from 'react-intl/locale-data/en';
import appLocaleDataZh from 'react-intl/locale-data/zh';
import enMessages from './en.json';
import zhMessages from './zh.json';

export default {
    'en-US': {
        messages: enMessages,
        locale: 'en-US',
        antd: antdEn,
        data: appLocaleDataEn
    },
    'zh-CN': {
        messages: zhMessages,
        locale: 'zh-CN',
        antd: antdZh,
        data: appLocaleDataZh
    }
}
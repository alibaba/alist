import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LocaleProvider } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import { EventEmitter2 } from 'eventemitter2';
import LangContext from './components/ContextProvider';
import LocaleConfig from './locales/config';

class I18nWrapper extends React.Component {
    constructor(props, context) {
        super(props, context);
        window.emitter = this.emitter = new EventEmitter2({ maxListeners: 100 });
        const defaultLang = this.getInitialLang();
        const currentLocale = LocaleConfig[defaultLang];
        this.state = {
            appLocale: currentLocale,
            lang: defaultLang
        };

        this.enum = ['en-US', 'zh-CN'];
        this.storeKey = 'noform-lang';
        addLocaleData(currentLocale);
    }

    getInitialLang = () => {
        
        const lastLang = localStorage.getItem(this.storeKey);
        const initLang = lastLang || 'en-US';
        if (!lastLang) localStorage.setItem(this.storeKey, initLang);
        return initLang;
    }

    changeLangeUrl = (pathname, target) => {
        const [_, lang] = pathname.split('/');
        let url = '';
        if (this.enum.indexOf(lang) !== -1) {
            url = pathname.replace(lang, target);
        } else {
            url = `/${target}${pathname}`;
        }        

        return url;
    }

    componentDidMount () {
        this.emitter.on('lang', (lang, { pathname, search }, history) => {            
            localStorage.setItem(this.storeKey, lang);
            const nextLocale = LocaleConfig[lang];
            addLocaleData(nextLocale.data);
            this.setState({
                appLocale: nextLocale,
                lang
            }, () => {
                const fxPathName = this.changeLangeUrl(pathname, lang);
                history.push(`${fxPathName}${search}`);
            });
        })
    }
    
    render() {
        const { appLocale, lang } = this.state;
        return <LocaleProvider locale={appLocale.antd}>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                <LangContext.Provider value={lang}>
                    <App lang={lang} />
                </LangContext.Provider>
            </IntlProvider>
        </LocaleProvider>
    }
}

ReactDOM.render(<I18nWrapper />, document.getElementById('root'));

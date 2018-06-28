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
        const defaultLang = 'en';
        const currentLocale = LocaleConfig[defaultLang];
        this.state = {
            appLocale: currentLocale,
            lang: defaultLang
        };

        addLocaleData(currentLocale);
    }

    componentDidMount () {
        this.emitter.on('lang', (lang) => {
            const nextLocale = LocaleConfig[lang];
            addLocaleData(nextLocale.data);
            this.setState({
                appLocale: nextLocale,
                lang
            });
        })
    }
    
    render() {
        const { appLocale, lang } = this.state;
        return <LocaleProvider locale={appLocale.antd}>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                <LangContext.Provider value={lang}>
                    <App />
                </LangContext.Provider>
            </IntlProvider>
        </LocaleProvider>
    }
}

ReactDOM.render(<I18nWrapper />, document.getElementById('root'));

import React from 'react';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import './site.less';

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { match, history } = this.props;
        const { params } = match;
        const { lang } = params;

        return <div>
            <Header lang={lang} history={history} />      
            <div className="noform-site-body">
                <div className="noform-site-content">
                    <div className="noform-site-landing">
                        <div className="landing-desc inline-align">
                            <div className="landing-title">NoForm</div>
                            <div className="landing-desc-content">
                                <FormattedMessage id="home.status.desc1" />
                                <p/>
                                <FormattedMessage id="home.status.desc2" />                                
                                <p/>
                                <FormattedMessage id="home.status.desc3" />                                
                            </div>

                            <div className="landing-btn-wrapper">
                                <Link to={`/${lang}/docs?md=easy/easy`}>
                                <div className="landing-btn">
                                    <FormattedMessage id="home.start.btn" />
                                </div>
                                </Link>
                            </div>
                        </div>
                        <div className="landing-img inline-align">
                            <img src="https://img.alicdn.com/tfs/TB1Z7ALt3mTBuNjy1XbXXaMrVXa-908-744.svg" alt="ladning"/>
                        </div>
                    </div>

                    <div className="noform-site-onboard">
                        <div className="noform-site-onboard-item">
                            <div className="onboard-img inline-align">
                                <img src="https://img.alicdn.com/tfs/TB1wKSKumBYBeNjy0FeXXbnmFXa-430-229.svg" alt="noform's status management"/>
                            </div>
                            <div className="onboard-desc inline-align">
                                <div className="onboard-title"><FormattedMessage id="home.status.title" /></div>
                                <div className="onboard-desc-content">
                                    <FormattedMessage id="home.status.sm1" />
                                    <p />
                                    <FormattedMessage id="home.status.sm2" />
                                </div>
                            </div>                            
                        </div>

                        <div className="noform-site-onboard-item">                            
                            <div className="onboard-desc inline-align">
                                <div className="onboard-title"><FormattedMessage id="home.core.title" /></div>
                                <div className="onboard-desc-content">
                                    <FormattedMessage id="home.core.desc1" />
                                    <p />
                                    <FormattedMessage id="home.core.desc2" />
                                </div>
                            </div>    
                            <div className="onboard-img inline-align">
                                <img src="https://img.alicdn.com/tfs/TB1DaF2ueuSBuNjy1XcXXcYjFXa-392-285.svg" alt="why noform's core works"/>
                            </div>                        
                        </div>

                        <div className="noform-site-onboard-item">
                            <div className="onboard-img inline-align">
                                <img src="https://img.alicdn.com/tfs/TB1DGF2ueuSBuNjy1XcXXcYjFXa-407-308.svg" alt="noform's component standard"/>
                            </div>
                            <div className="onboard-desc inline-align">
                                <div className="onboard-title"><FormattedMessage id="home.component.title" /></div>
                                <div className="onboard-desc-content">                                    
                                    <FormattedMessage id="home.component.desc1" />
                                    <p />
                                    <FormattedMessage id="home.component.desc2" />
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="noform-site-whouse">
                        <div className="who-use-title"><FormattedMessage id="home.end.title" /></div>
                        <div className="who-use-list">
                            <img src="https://img.alicdn.com/tfs/TB1jAl8ueSSBuNjy0FlXXbBpVXa-240-124.png" alt="ali is using noform"/>
                        </div>
                    </div>

                    <div className="noform-site-footer">
                        
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Main;
import React from 'react';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import './site.less';

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            <Header />      
            <div className="noform-site-body">
                <div className="noform-site-content">
                    <div className="noform-site-landing">
                        <div className="landing-desc inline-align">
                            <div className="landing-title">NoForm</div>
                            <div className="landing-desc-content">
                                NoFrom 将表单操作到抽象到核心，从此数据(data)的管理和视图(view)分离开来，权责分明。
                                <p/>
                                通过内置的状态管理方案，能够快速切换同一表单的不同状态，新建和详情不再需要维护多份代码。
                                <p/>
                                通过定制组件接入标准，方便接入社区优秀的组件库，减少开发者重复劳动的时间。
                            </div>

                            <div className="landing-btn-wrapper">
                                <Link to={"/docs?md=easy/easy"}>
                                <div className="landing-btn">
                                    Get Started
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
                                <div className="onboard-title">状态管理</div>
                                <div className="onboard-desc-content">
                                    基于状态管理方案，能够自由操作表单各个部分的状态显示。
                                    <p />
                                    通过切换全局状态还能够达到代码复用的效果，写一份代码，相当于写多份状态页。
                                </div>
                            </div>                            
                        </div>

                        <div className="noform-site-onboard-item">                            
                            <div className="onboard-desc inline-align">
                                <div className="onboard-title">核心控制</div>
                                <div className="onboard-desc-content">
                                    核心是表单操作的抽象，涵盖 值values, 状态status, 校验validation, 联动relation 等方面。
                                    <p />
                                    使用表单核心可以避免重复编写相同的表单处理逻辑，提升效能。
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
                                <div className="onboard-title">组件标准</div>
                                <div className="onboard-desc-content">
                                    编写大量组件是痛苦的，我们应该减少重复开发，通过定制接入组件标准，我们可以拥抱社区优秀的组件。
                                    <p />
                                    表单组件的标准非常多，我们更倾向于受控组件的形式，更加简单直接。
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="noform-site-whouse">
                        <div className="who-use-title">谁在使用</div>
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
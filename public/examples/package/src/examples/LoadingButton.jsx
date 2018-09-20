import React, { Component } from 'react';
import { Button } from 'noform/lib/wrapper/antd';
import PropTypes from 'prop-types';

export default class LoadingButton extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.any
    };
    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    handleClick = async (...params) => {
        const { onClick } = this.props;
        const resp = onClick(...params);
        if (resp instanceof Promise) {
            this.setState({ loading: true });
            await resp;
            this.setState({ loading: false });
        }
    }

    render() {
        const { onClick, ...others } = this.props;
        const { loading } = this.state;
        return <Button loading={loading} {...others} onClick={this.handleClick} />;
    }
}
import React from 'react';

class Self extends React.Component {
    constructor(props) {
        super(props);
        this.params = {};
    }

    getParams = () => this.params

    setParams = (obj, replace = false) => {
        if (replace) {
            this.params = obj;
        } else {
            this.params = {
                ...this.params,
                ...(obj || {}),
            };
        }
    }

    refresh = () => {
        this.forceUpdate();
    }

    render() {
        const { render } = this.props;
        return render(this);
    }
}

export default Self;

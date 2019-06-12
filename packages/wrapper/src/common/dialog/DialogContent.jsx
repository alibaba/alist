import React from 'react';
import Context from 'noform/lib/context/dialogForm';

class DialogContent extends React.Component {
    constructor(props) {
        super(props);

        const { task } = props;
        this.state = {
            core: null,
            loading: typeof task === 'function',
            success: false,
            data: null,
        };
    }

    componentDidMount = async () => {
        await this.runTask();
    }

    handleOnMount = (core) => {
        const { onMount } = this.props;
        if (core) {
            onMount(core);
            this.setState({
                core,
            });
        }
    }

    runTask = async () => {
        const { task } = this.props;
        if (typeof task === 'function') {
            let success = false;
            let data = null;

            try {
                data = await task();
                success = true;
            } catch (e) {
                success = false;
            }

            this.setState({
                loading: false,
                success,
                data,
            });
        }
    }

    render() {
        const { core, loading, success, data } = this.state;
        const { content, footer } = this.props;

        let formInstance = null;
        const payload = { loading, success, data, refresh: this.runTask };
        if (typeof content === 'function') {
            formInstance = content(payload);
        } else {
            formInstance = content;
        }

        return <Context.Provider value={{
            onDialogMount: this.handleOnMount,
            dialogFooter: footer,
            taskPayload: payload,
        }}>
            {formInstance}
            {core ?  null : footer(payload)}
        </Context.Provider>
    }
}

export default DialogContent;

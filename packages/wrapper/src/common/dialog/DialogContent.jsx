import React from 'react';
import Context from 'noform/lib/context/dialogForm';

class DialogContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            core: null,
        };
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

    render() {
        const { core } = this.state;
        const { children, footer } = this.props;

        return <Context.Provider value={{
            onDialogMount: this.handleOnMount,
            dialogFooter: footer
        }}>
            {children}
            {core ?  null : footer()}
        </Context.Provider>
    }
}

export default DialogContent;

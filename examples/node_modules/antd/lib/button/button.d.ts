import * as React from 'react';
import Group from './button-group';
export declare type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
export declare type ButtonShape = 'circle' | 'circle-outline';
export declare type ButtonSize = 'small' | 'default' | 'large';
export declare type ButtonHTMLType = 'submit' | 'button' | 'reset';
export interface BaseButtonProps {
    type?: ButtonType;
    icon?: string;
    shape?: ButtonShape;
    size?: ButtonSize;
    loading?: boolean | {
        delay?: number;
    };
    prefixCls?: string;
    className?: string;
    ghost?: boolean;
}
export declare type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export declare type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export declare type ButtonProps = AnchorButtonProps | NativeButtonProps;
export default class Button extends React.Component<ButtonProps, any> {
    static Group: typeof Group;
    static __ANT_BUTTON: boolean;
    static defaultProps: {
        prefixCls: string;
        loading: boolean;
        ghost: boolean;
    };
    static propTypes: {
        type: any;
        shape: any;
        size: any;
        htmlType: any;
        onClick: any;
        loading: any;
        className: any;
        icon: any;
    };
    timeout: number;
    delayTimeout: number;
    constructor(props: ButtonProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ButtonProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    fixTwoCNChar(): void;
    handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    isNeedInserted(): boolean;
    render(): JSX.Element;
}

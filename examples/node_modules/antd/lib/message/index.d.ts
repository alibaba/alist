import * as React from 'react';
export interface ThenableArgument {
    (_: any): any;
}
export interface MessageType {
    (): void;
    then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<any>;
    promise: Promise<any>;
}
export declare type ConfigOnClose = () => void;
export interface ConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
}
declare const _default: {
    info(content: React.ReactNode, duration?: number | (() => void) | undefined, onClose?: ConfigOnClose | undefined): MessageType;
    success(content: React.ReactNode, duration?: number | (() => void) | undefined, onClose?: ConfigOnClose | undefined): MessageType;
    error(content: React.ReactNode, duration?: number | (() => void) | undefined, onClose?: ConfigOnClose | undefined): MessageType;
    warn(content: React.ReactNode, duration?: number | (() => void) | undefined, onClose?: ConfigOnClose | undefined): MessageType;
    warning(content: React.ReactNode, duration?: number | (() => void) | undefined, onClose?: ConfigOnClose | undefined): MessageType;
    loading(content: React.ReactNode, duration?: number | (() => void) | undefined, onClose?: ConfigOnClose | undefined): MessageType;
    config(options: ConfigOptions): void;
    destroy(): void;
};
export default _default;

import * as React from 'react';
export declare type ProgressType = 'line' | 'circle' | 'dashboard';
export declare type ProgressSize = 'default' | 'small';
export interface ProgressProps {
    prefixCls?: string;
    className?: string;
    type?: ProgressType;
    percent?: number;
    successPercent?: number;
    format?: (percent?: number, successPercent?: number) => string;
    status?: 'success' | 'active' | 'exception';
    showInfo?: boolean;
    strokeWidth?: number;
    trailColor?: string;
    width?: number;
    style?: React.CSSProperties;
    gapDegree?: number;
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    size?: ProgressSize;
}
export default class Progress extends React.Component<ProgressProps, {}> {
    static Line: any;
    static Circle: any;
    static defaultProps: {
        type: ProgressType;
        percent: number;
        showInfo: boolean;
        trailColor: string;
        prefixCls: string;
        size: ProgressSize;
    };
    static propTypes: {
        status: any;
        type: any;
        showInfo: any;
        percent: any;
        width: any;
        strokeWidth: any;
        trailColor: any;
        format: any;
        gapDegree: any;
        default: any;
    };
    render(): JSX.Element;
}

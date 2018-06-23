import * as React from 'react';
export interface TimeLineItemProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    dot?: React.ReactNode;
    pending?: boolean;
    style?: React.CSSProperties;
}
export default class TimelineItem extends React.Component<TimeLineItemProps, any> {
    static defaultProps: {
        prefixCls: string;
        color: string;
        pending: boolean;
    };
    render(): JSX.Element;
}

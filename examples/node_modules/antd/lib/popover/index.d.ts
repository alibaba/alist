import * as React from 'react';
import { AbstractTooltipProps, TooltipPlacement, TooltipTrigger } from '../tooltip';
export interface PopoverProps extends AbstractTooltipProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
}
export default class Popover extends React.Component<PopoverProps, {}> {
    static defaultProps: {
        prefixCls: string;
        placement: TooltipPlacement;
        transitionName: string;
        trigger: TooltipTrigger;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        overlayStyle: {};
    };
    private tooltip;
    getPopupDomNode(): any;
    getOverlay(): JSX.Element;
    saveTooltip: (node: any) => void;
    render(): JSX.Element;
}

import * as React from 'react';
import Grid from './Grid';
import Meta from './Meta';
import { Omit } from '../_util/type';
export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';
export declare type CardType = 'inner';
export interface CardTabListType {
    key: string;
    tab: React.ReactNode;
}
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    prefixCls?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    bodyStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    loading?: boolean;
    noHovering?: boolean;
    hoverable?: boolean;
    children?: React.ReactNode;
    id?: string;
    className?: string;
    type?: CardType;
    cover?: React.ReactNode;
    actions?: Array<React.ReactNode>;
    tabList?: CardTabListType[];
    onTabChange?: (key: string) => void;
    activeTabKey?: string;
    defaultActiveTabKey?: string;
}
export interface CardState {
    widerPadding: boolean;
}
export default class Card extends React.Component<CardProps, CardState> {
    static Grid: typeof Grid;
    static Meta: typeof Meta;
    state: {
        widerPadding: boolean;
    };
    private resizeEvent;
    private updateWiderPaddingCalled;
    private container;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateWiderPadding(): void;
    onTabChange: (key: string) => void;
    saveRef: (node: HTMLDivElement) => void;
    isContainGrid(): undefined;
    getAction(actions: React.ReactNode[]): JSX.Element[] | null;
    getCompatibleHoverable(): boolean | undefined;
    render(): JSX.Element;
}

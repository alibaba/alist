
declare interface GridProps {
    dataSource: Array<any>;
    primaryKey:String;
    children:Array<GridItem>;
    loading:boolean;
}

declare class GridItem extends React.Component {
    title: String;
    dataIndex: String;
    cell: Function;
}


export default class Grid extends React.Component<GridProps, any>{
    static Item: GridItem;
}

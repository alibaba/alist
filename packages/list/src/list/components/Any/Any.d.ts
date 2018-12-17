export default interface AnyProps {
    render: ((core: Any) => React.ReactNode)) => void
}

export default class Any extends React.Component<AnyProps, any> { }
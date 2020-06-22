export const compatLayoutProps = (props) => {
    const { mode, autoRow = true, labelAlign = 'top', ...others } = props
    const grid = (!mode || mode === 'columns') && !props.inline
    const layoutProps: any = {
        grid,
        autoRow,
        ...others
    }
    if (!props.inset) layoutProps.labelAlign = labelAlign
    if (props.inset) layoutProps.full = true
    return layoutProps
}

export const compatLayoutItemProps = (props) => {
    const compatProps = {...(props || {})}
    const megaKeys = ['full', 'labelAlign', 'span', 'hasBorder', 'labelCol', 'wrapperCol', 'labelWidth', 'wrapperWidth'].filter(k => k in (props.props || {}))
    if (megaKeys.length) {
        if (!compatProps.props['x-mega-props']) compatProps.props['x-mega-props'] = {}
        megaKeys.forEach(k => {
            compatProps.props['x-mega-props'][k] = props.props[k]
        })
    }
    return compatProps
}
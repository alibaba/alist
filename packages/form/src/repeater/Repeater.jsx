import React from 'react';
import Form from '../component/Form';
import TableCom from './TableCom';
import ActionButton from './ActionButton';
import RowContext from '../context/repeaterRow';
import { isValidStatus } from '../util/is';

const isIf = item => (item && item.type && item.type.displayName === 'If');
const getIfChild = item => (item && item.props && item.props.children) ? React.Children.only(item.props.children) : null;

export default function bind(type, source) {
    const { Input } = source;

    const isInline = type === 'inline';
    const isTable = type === 'table';
    const addSuffix = isInline ? 'Inline' : '';

    class Repeater extends React.Component {
        getItemsConfig = (rowIndex) => {
            const { children, repeaterCore } = this.props;
            const { formList = [] } = repeaterCore || {};
            const itemsConfig = React.Children.map(children, (childItem, index) => {
                // 非常脏的一段逻辑，而且inlineReater这种非受控组件不适用，需要花时间去重新梳理Repeater的通信方式和渲染方式
                if (isIf(childItem)) {
                    let ifResult = null;
                    const { when, children: ifChild } = childItem.props || {};
                    const missonList = rowIndex !== undefined ? [formList[rowIndex] || {}] : formList || [];
                    if (typeof when === 'function') {
                        let canShow = false;
                        missonList.forEach((mItem, mIndex) => {
                            if (mItem.getValues) {
                                const mResult = when(mItem.getValues(), mIndex);
                                if (mResult && !canShow) canShow = true;
                            }
                        });

                        if (canShow) {
                            ifResult = React.Children.only(ifChild);
                        } else {
                            const { props: ifChildProps } = ifChild || {};
                            const { children, ...otherIfProps } = ifChildProps || {};
                            ifResult = <div {...otherIfProps} />;
                        }
                    }

                    return ifResult;
                } else {
                    return childItem;
                }
            })
            .filter(item => item !== null)
            .map(child => ({
                name: child.props.name,
                label: child.props.label,
                prefix: child.props.prefix,
                suffix: child.props.suffix,
                multiple: child.props.multiple,
                renderCell: child.props.renderCell,
                style: child.props.style,
                status: child.props.status,
                className: child.props.className,
            })).
            filter(item => (item.name || item.multiple || item.renderCell));

            return itemsConfig;
        }

        hasOperBtn = () => {            
            let failedDeleteCount = 0;
            let failedUpdateCount = 0;
            const { multiple = false, repeaterCore,
                hasUpdate: propUpdate, hasDelete: propDelete } = this.props;
            const { formList } = repeaterCore;
            const rowLength = Array.isArray(formList) ? formList.length : 0;
            const rowList = formList.map((core, index) => {
                const values = core.getValues();
                const { id } = core;

                const localHasDelete = this.decideHasBtn('hasDelete', values, index);
                const localHasUpdate = this.decideHasBtn('hasUpdate', values, index);

                if (!localHasDelete) failedDeleteCount += 1;
                if (!localHasUpdate) failedUpdateCount += 1;
            });

            const defaultDelete = typeof propDelete === 'boolean' ? propDelete :  true;
            const defaultUpdate = typeof propUpdate === 'boolean' ? propUpdate :  true;
            
            const hasDelete = rowLength ? (failedDeleteCount < rowLength) : defaultDelete;
            const hasUpdate = rowLength ? (failedUpdateCount < rowLength) : defaultUpdate;

            const isInlineMode = !multiple && !isTable;
            const isSyncmode = !isTable && multiple;
            const updateBtn = isSyncmode ? false : hasUpdate;

            return (updateBtn || hasDelete || isInlineMode);
        }

        renderFilter = () => {
            const { handleSearch, filterElement, filter } = this.props;
            let searchEle = null;
            if (filter) {
                if (typeof filterElement === 'function') {
                    searchEle = filterElement(handleSearch);
                } else if (React.isValidElement(filterElement)) {
                    searchEle = filterElement;
                } else {
                    searchEle = <Input className="repeater-search" onChange={handleSearch} />;
                }
            }

            return searchEle;
        }

        decideHasBtn = (propsName, values, index) => {
            const btnProps = this.props[propsName];
            let result = true;
            if (typeof btnProps === 'boolean') {
                result = btnProps;
            } else if (typeof btnProps === 'function') {
                result = btnProps(values, index);
            }

            return result;
        }

        renderRowList = () => {            
            const {
                multiple = false,
                itemAlign = 'left',
                children,
                status,
                repeaterCore,
                formProps,
                getText,
            } = this.props;

            const {
                updateText, deleteText, saveText, cancelText,
            } = getText();

            const { formList } = repeaterCore;
            const rowList = formList.map((core, index) => {
                const values = core.getValues();
                const { id } = core;

                const hasDelete = this.decideHasBtn('hasDelete', values, index);
                const hasUpdate = this.decideHasBtn('hasUpdate', values, index);

                const focusMode = core.$focus;
                const editable = status === 'edit';
                const focusCls = focusMode ? 'inline-repeater-focus' : '';
                const cellCls = `repeater-table-cell-wrapper ${focusCls} repeater-table-cell-wrapper-${itemAlign}`;

                const updateBtn = !multiple && !focusMode && hasUpdate ? <ActionButton type={`update${addSuffix}`} updateText={updateText} /> : null;
                const deleteBtn = (!focusMode || multiple) && hasDelete ? <ActionButton type="delete" deleteText={deleteText} /> : null;
                const saveBtn = !isTable && !multiple && focusMode ? <ActionButton type="save" saveText={saveText} /> : null;
                const cancelBtn = !isTable && !multiple && focusMode ? <ActionButton type="cancel" cancelText={cancelText} /> : null;

                const cleanLayout = { layout: { label: null, control: null } };
                let listItems = null;
                const childMap = {};
                const childrenRefArr = ([].concat(children)).reduce((a, b) => [].concat(a, b), []);
                childrenRefArr.forEach((childitem) => {
                    let mrChild = childitem; 
                    if (isIf(childitem)) {
                        mrChild = getIfChild(childitem);
                    }
                    const { label, name } = mrChild.props;
                    childMap[`${label}${name}`] = React.cloneElement(mrChild, { label: undefined, ...cleanLayout });
                });

                // 遍历渲染数据
                const itemsConfig = this.getItemsConfig(index);
                listItems = itemsConfig.map((conf) => {
                    const cls = conf.className || '';
                    const style = conf.style || {};
                    let customRender = null;
                    if (conf.renderCell) {
                        customRender = conf.renderCell(values[conf.name], {
                            values, id, core, index,
                        });
                    }

                    const childElement = childMap[`${conf.label}${conf.name}`];
                    let innerValElement = null;
                    if (customRender) {
                        innerValElement = customRender;
                    } else if (React.isValidElement(childElement)) {
                        const validItemStatus = isValidStatus(conf.status);
                        let globalStatus = status;
                        if (focusMode) { // 焦点模式下，默认为edit，外界状态不为edit时需要同步
                            globalStatus = status !== 'edit' ? status : 'edit';
                        } else {
                            globalStatus = 'preview';
                        }
                        const itemStatus = validItemStatus ? conf.status : globalStatus;

                        innerValElement = React.cloneElement(childElement, { status: itemStatus });
                    } else {
                        innerValElement = childElement;
                    }
                    return (<td style={style} key={`${conf.label}${conf.name}`}>
                        <div className={`${cellCls} ${cls}`}>
                            {innerValElement}
                        </div>
                    </td>);
                });

                const hasOperBtn = this.hasOperBtn();
                let operEle = null;
                if (hasOperBtn) {
                    operEle = (<td>
                        {editable ? <div className={cellCls}>
                            {saveBtn}
                            {cancelBtn}
                            {updateBtn}
                            {deleteBtn}
                        </div> : null}
                    </td>);
                }

                const rowContextValue = { core, id };
                return (<RowContext.Provider value={rowContextValue} key={id}>
                    <Form Com="tr" {...formProps} {...cleanLayout} core={core} className="table-repeater-row">
                        {listItems}
                        {operEle}
                    </Form>
                </RowContext.Provider>
                );
            });

            return rowList;
        }

        renderContainer = () => {
            const {
                style = {}, className, view,
                status,
                itemAlign, hasAdd = true, hasHeader = true, addPosition = 'top',
                multiple = false,
                maxLength,
                operateClassName = '',
                getText,
                repeaterCore,
                top,
                bottom,
            } = this.props;

            const { addText, operateText } = getText();
            const itemsConfig = this.getItemsConfig();

            const editable = status === 'edit';
            const cellCls = `repeater-table-cell-wrapper repeater-table-cell-wrapper-${itemAlign}`;

            // 展示添加按钮
            const { formList } = repeaterCore;
            const listLength = Array.isArray(formList) ? formList.length : 0;
            const addType = multiple ? `addMultiple${addSuffix}` : `add${addSuffix}`;
            let addBtnEle = null;
            if (hasAdd && editable) {
                if (maxLength !== undefined &&
                    (listLength > maxLength || listLength === maxLength)) {
                    // do nothing...
                } else {
                    addBtnEle = <ActionButton type={addType} addText={addText} />;
                }
            }

            // 渲染头部
            const header = itemsConfig.map((conf) => {
                const cls = conf.className || '';
                const headStyle = conf.style || {};
                return (<th style={headStyle} className={`${cls} repeater-table-header-node`} key={`${conf.label}${conf.name}`}>
                    <div className={cellCls}> {conf.label} </div>
                </th>);
            });

            // 如果当前状态为编辑状态，展示操作栏位
            const hasOperBtn = this.hasOperBtn();
            if (editable && hasOperBtn) {
                header.push(<th className={`repeater-table-header-node ${operateClassName}`} key="last">
                    <div className={cellCls}>{operateText}</div>
                </th>);
            }

            // 渲染内容
            let containerContent = null;
            if (view) {
                containerContent = this.renderView();
            } else {
                containerContent = (<TableCom hasHeader={hasHeader} header={header}>
                    {this.renderRowList()}
                </TableCom>);
            }

            let topElement = null;
            let bottomElement = null;
            if (top && typeof top === 'function') topElement = top();
            if (top && (React.isValidElement(top) || typeof top === 'string')) topElement = typeof top === 'string' ? <div>{top}</div> : top;
            if (bottom && typeof bottom === 'function') bottomElement = bottom();
            if (bottom && React.isValidElement(bottom) || typeof bottom === 'string') bottomElement = typeof bottom === 'string' ? <div>{bottom}</div> : bottom;

            return (<div className={`table-repeater-wrapper ${className || ''}`} style={style}>
                {topElement}
                {this.renderFilter()}
                {addPosition === 'top' ? addBtnEle : null}
                {containerContent}
                {addPosition === 'bottom' ? addBtnEle : null}
                {bottomElement}
            </div>);
        }

        // 自定义渲染视图
        renderView = () => {
            const { view } = this.props;
            let viewElement = null;
            if (view) {
                if (typeof view === 'function') {
                    const rowList = this.renderRowList();
                    viewElement = view(rowList, this);
                } else {
                    viewElement = view;
                }
            }
            return viewElement;
        }

        render() {
            return this.renderContainer();
        }
    }

    return Repeater;
}

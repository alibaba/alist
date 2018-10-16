import React from 'react';
import Form from '../component/Form';
import TableCom from './TableCom';
import ActionButton from './ActionButton';
import RowContext from '../context/repeaterRow';
import { isValidStatus } from '../util/is';

export default function bind(type, source) {
    const { Input } = source;

    const isInline = type === 'inline';
    const isTable = type === 'table';
    const addSuffix = isInline ? 'Inline' : '';

    class Repeater extends React.Component {
        getItemsConfig = () => {
            const { children } = this.props;
            const itemsConfig = React.Children.map(children, child => ({
                name: child.props.name,
                label: child.props.label,
                prefix: child.props.prefix,
                suffix: child.props.suffix,
                multiple: child.props.multiple,
                renderCell: child.props.renderCell,
                style: child.props.style,
                status: child.props.status,
                className: child.props.className,
            })).filter(item => (item.name || item.multiple || item.renderCell));
            return itemsConfig;
        }

        hasOperBtn = () => {
            const {
                multiple = false,
                hasDelete = true,
                hasUpdate = true,
            } = this.props;

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

        renderRowList = () => {
            const itemsConfig = this.getItemsConfig();
            const {
                multiple = false,
                hasDelete = true, hasUpdate = true,
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
            console.log('====>>>>formList Length:', formList.length);
            const rowList = formList.map((core, index) => {
                const values = core.getValues();
                const { id } = core;

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
                    const { label, name } = childitem.props;
                    childMap[`${label}${name}`] = React.cloneElement(childitem, { label: undefined, ...cleanLayout });
                });

                // 遍历渲染数据
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
                        const globalStatus = (focusMode && status !== 'preview') ? status : 'preview';
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

            return (<div className={`table-repeater-wrapper ${className || ''}`} style={style}>
                {this.renderFilter()}
                {addPosition === 'top' ? addBtnEle : null}
                {containerContent}
                {addPosition === 'bottom' ? addBtnEle : null}
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
                }
                viewElement = view;
            }
            return viewElement;
        }

        render() {
            return this.renderContainer();
        }
    }

    return Repeater;
}

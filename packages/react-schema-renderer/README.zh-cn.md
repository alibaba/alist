```jsx
import React, { createContext, useContext,
  useState, useEffect, useRef, useMemo } from 'react'
import { Table } from '@alifd/next';
import '@alifd/next/dist/next.css'



const List = props => (<div {...props} />);
const schema = {
  componentsTree: [
    {
      componentName: 'div',
      props: {},
      children: [
        {
          componentName: 'AList',
          props: {
            dataSource: [
              { id: 1, name: 'tom', age: 25 },
              { id: 2, name: 'jerry', age: 27 }
            ]
          },
          children: [
            {
              componentName: 'Table',
              props: {
                onSort: '$func.onSort',
                dataSource: [
                  { id: 1, name: 'tom', age: 25 },
                  { id: 2, name: 'jerry', age: 27 }
                ],
                rowSelection: {
                  onChange: '$func.onSelectChange',
                }
              },
              children: [
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'id', title: 'id' },
                },
                {
                  componentName: 'Table.Column',
                  props: { dataIndex: 'name', title: 'name', sortable: true },
                },
                {
                  componentName: 'Table.Column',
                  props: { title: 'operation', cell: '$func.renderOper' },
                }
              ]
            },
            {
              componentName: 'Pagination',
              props: {}
            }
          ]
        }
      ]
    }
  ]
}

const funcRegistry = {
  renderOper: (val, index, record) => {
    return <div>操作</div>
  },
  clk: () => {
    
  },
  onSelectChange: (...args) => {
    console.log(args);
  },
  onSort: function () {
    console.log('onSort====>', this, this.list)
    console.log('===>', this);
  }
}

const componentsRegistry = {
    div: props => (<div {...props} />),
    span: props => (<span {...props} />),
    p: props => (<p {...props} />),
    b: props => (<b {...props} />),
    a: props => (<a {...props} />),
    fragment: props => (<React.Fragment {...props} />),
    Table,
    Pagination: props => (<div {...props} />),
    'Table.Column': Table.Column,
    AList: List,
};


const RegistryContext = createContext({
  components: {},
  funcs: {},
  context: {},
  i18n: {},
});

// 将属性进行递归注入函数池子的方法
const injectFuncs = (props, funcs) => {
  if (!props) return props;
  if (Array.isArray(props)) {
    return props.map((item) => injectFuncs(item, funcs))
  } else if (typeof props === 'object') {
    const obj = {...props};
    Object.keys(props).forEach(k => {
      obj[k] = injectFuncs(obj[k], funcs);
    });
    return obj;
  } else if (typeof props === 'string') {
    // 检测是否在函数池子内有注册
    if (props.startsWith('$func')) {
      const fn = props.replace(/\$func\./, '');
      if (!(fn in funcs)) {
        console.warn('function name:', fn, 'not found in funcRegistry');
      } else {
        return funcs[fn];
      }
    } else {
      return props;
    }
    
    // 真正替换函数的地方
    if (props.startsWith('$func') &&
      ((props.replace(/\$func\./, '')) in funcs)) {
      return funcs[props];
    } else {
      return props;
    }
  } else {
    return props;
  }
}

// 递归的Schema渲染组件
// note: 不能直接用递归组件 + context 直接解决渲染
// 有相当多的组件使用虚拟渲染（即分析JSX结构数据，实际并不会使用该JSX执行真正的渲染），因此不能通过包裹组件来做遍历
// 递归仍然需要，不过需要直接返回类名之间操作（但是需要递归子组件）
const renderSchema = (props, contextProps) => {
  let ele = null
  const { context, funcs, components, i18n } = contextProps;
  const { children, componentName, props: componentProps } = props;
  
  const schemaResult = {
    component: null,
    props: {},
    children: null
  };


  if (!(componentName in components)) { // 不存在
    console.warn('componentName:', componentName, 'not found in componentsRegistry')
  } else {
    let childs = null
    if (Array.isArray(children)) {
      childs = children.map(item => {
        if (typeof item === 'string') { // 纯文本提供一种通道可以直接发掉
          return item
        }
        
        const { component, props: parsedProps, children: parsedChidlren } = renderSchema(item, contextProps);
        return React.createElement(component, parsedProps, parsedChidlren);
      });      
    }

    schemaResult.component = components[componentName];
    schemaResult.props = injectFuncs((componentProps || {}), funcs);
    schemaResult.children = childs;
  }

  return schemaResult;
}

const noop = () => ({})
const SchemaContainer = (props) => {
  const { schema, componentsRegistry = {}, funcRegistry = {}, generateContext = noop } = props
  // 初始化作用域
  const contextRef = useRef(null)
  const context = useMemo(() => {
    return contextRef.current = contextRef.current || generateContext()
  });

  // 绑定作用域到方法上
  Object.keys(funcRegistry).forEach(fn => {
    funcRegistry[fn] = funcRegistry[fn].bind(context)
  })

  // 拆分文案及其余配置
  const { componentsTree = [], i18n = {} } = schema

  // 全局注册的组件通过context传递
  const contextValue = {
    components: componentsRegistry,
    funcs: funcRegistry,
    context,
    i18n,
  };

  return <RegistryContext.Provider value={contextValue}>
    {(componentsTree || []).map((componentSchema) => {
      const { component, props: rootProps, children: rootChilds } = renderSchema(componentSchema, contextValue);      
      return React.createElement(component, rootProps, rootChilds);
    })}
  </RegistryContext.Provider>
}

const App = () => {
  return <div>
  <SchemaContainer
    componentsRegistry={componentsRegistry}
    funcRegistry={funcRegistry}
    schema={schema}
  />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```
import React, { useRef, useMemo } from 'react'
import { ListDomain, ListDomainContext } from '@alist/react'
import _ from 'lodash'
import {
  registerListFuncs,
  registerListComponent,
  cleanListComponentRegistry,
  cleanListFunctionRegistry,
  getComponentsRegistry,
  getFuncsRegistry
} from './shared'

// 将属性进行递归注入函数池子的方法
const injectFuncs = (props, funcs) => {
  if (!props) return props
  if (Array.isArray(props)) {
    return props.map(item => injectFuncs(item, funcs))
  } else if (typeof props === 'object') {
    const obj = { ...props }
    Object.keys(props).forEach(k => {
      obj[k] = injectFuncs(obj[k], funcs)
    })
    return obj
  } else if (typeof props === 'string') {
    // 检测是否在函数池子内有注册
    if (props.startsWith('$func')) {
      const fn = props.replace(/\$func\./, '')
      if (!(fn in funcs)) {
        console.warn('function name:', fn, 'not found in funcRegistry')
      } else {
        return funcs[fn]
      }
    } else {
      return props
    }

    // 真正替换函数的地方
    if (props.startsWith('$func') && props.replace(/\$func\./, '') in funcs) {
      return funcs[props]
    } else {
      return props
    }
  } else {
    return props
  }
}

// 递归的Schema渲染组件
// note: 不能直接用递归组件 + context 直接解决渲染
// 有相当多的组件使用虚拟渲染（即分析JSX结构数据，实际并不会使用该JSX执行真正的渲染），因此不能通过包裹组件来做遍历
// 递归仍然需要，不过需要直接返回类名之间操作（但是需要递归子组件）
const renderSchema = (props, contextProps) => {
  const { effects, actions, funcRegistry, componentsRegistry } = contextProps
  const { children, componentName, props: componentProps } = props

  const schemaResult = {
    component: null,
    props: {} as any,
    children: null
  }

  if (!_.has(componentsRegistry, componentName)) {
    // 不存在
    console.warn(
      'componentName:',
      componentName,
      'not found in componentsRegistry'
    )
  } else {
    let childs = null
    const arrChilds = [...(children || [])]
    if (Array.isArray(arrChilds) && arrChilds.length) {
      childs = arrChilds.map(item => {
        if (typeof item === 'string') {
          // 纯文本提供一种通道可以直接发掉
          return item
        }

        const {
          component,
          props: parsedProps,
          children: parsedChidlren
        } = renderSchema(item, contextProps)
        return React.createElement(component, parsedProps, parsedChidlren)
      })
    }

    schemaResult.component = _.get(componentsRegistry, componentName)
    schemaResult.props = injectFuncs(componentProps || {}, funcRegistry)
    schemaResult.children = childs

    // List主体，需要在这里完成actions握手
    if (componentName === 'List') {
      if (actions) schemaResult.props.actions = actions
      if (effects) schemaResult.props.effects = effects
    }
  }

  return schemaResult
}

const noop = () => ({})
const SchemaSolver = props => {
  const {
    effects,
    actions,
    schema,
    componentsRegistry = {},
    funcRegistry = {},
    generateContext = noop
  } = props

  // 拆分文案及其余配置
  const { componentsTree = [], i18n = {} } = schema

  // 自定义全局方法，自定义本地方法
  const finalFuncRegistry = {
    ...getFuncsRegistry(),
    ...(funcRegistry || {})
  }

  // 默认的html组件，自定义全局组件，自定义本地组件
  const finalComponentsRegistry = {
    ...getComponentsRegistry(),
    ...(componentsRegistry || {})
  }

  // 初始化作用域
  const contextRef = useRef(null)
  const context = useMemo(() => {
    if (contextRef.current) {
      return contextRef.current
    } else {
      const ctx = new ListDomain()
      const localCtx = generateContext() || {}

      ctx.setContext({
        schema,
        actions,
        effects,
        componentsRegistry: finalComponentsRegistry,
        funcRegistry: finalFuncRegistry,
        i18n,
        ...localCtx
      })
      return ctx
    }
  }, [])

  Object.keys(finalFuncRegistry).forEach(fn => {
    finalFuncRegistry[fn] = finalFuncRegistry[fn].bind(context)
  })

  return (
    <ListDomainContext.Provider value={context}>
      {(componentsTree || []).map(componentSchema => {
        const {
          component,
          props: rootProps,
          children: rootChilds
        } = renderSchema(componentSchema, context)
        return React.createElement(component, rootProps, rootChilds)
      })}
    </ListDomainContext.Provider>
  )
}

export {
  SchemaSolver as default,
  registerListFuncs,
  registerListComponent,
  cleanListComponentRegistry,
  cleanListFunctionRegistry
}

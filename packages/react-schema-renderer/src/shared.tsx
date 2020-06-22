import React from 'react'

let baseRegistry = {
  div: props => <div {...props} />
}

let globalComponentsRegistry = {}
let globalFuncs = {}

export const getComponentsRegistry = () => ({
  ...baseRegistry,
  ...globalComponentsRegistry
})

export const getFuncsRegistry = () => ({
  ...globalFuncs
})

export const registerListComponent = (...args) => {
  if (args.length === 1) {
    Object.keys(args[0]).forEach(k => {
      if (args[0][k]) {
        globalComponentsRegistry[k] = args[0][k]
      }
    })
  } else {
    globalComponentsRegistry[args[0]] = args[1]
  }
}

export const registerListFuncs = (...args) => {
  if (args.length === 1) {
    Object.keys(args[0]).forEach(k => {
      if (args[0][k]) {
        globalFuncs[k] = args[0][k]
      }
    })
  } else {
    globalFuncs[args[0]] = args[1]
  }
}

export const cleanListComponentRegistry = () => {
  globalComponentsRegistry = {}
}

export const cleanListFunctionRegistry = () => {
  globalFuncs = {}
}

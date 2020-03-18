import EventEmitter from 'events'
import { ListLifeCycleTypes, LifeCycleHandler, LifeCyclesOptions } from '../types'
import { isFn } from '../util'

class ListLifeCycle extends EventEmitter {
    private handler: (opts: LifeCyclesOptions) => void
    id: string
    type: string
    constructor(LifeCycleHandler: LifeCycleHandler<any>)
    constructor(type: ListLifeCycleTypes, handler: LifeCycleHandler<any>)
    constructor(handlerMap: { [type: string]: LifeCycleHandler<any> })
    constructor(...params: any[]) {
        super()
        
        this.id = 'rd_' + `${Math.random()}`.slice(2)
        if (params.length === 2) {
            this.type = params[0]
        }
        this.handler = (opts: LifeCyclesOptions) => {
            const { type, payload, ctx } = opts
            // '*' means god mode
            if (Array.isArray(params) && params.length > 0) {
                if (params.length === 2) { // type, handler
                    if ((ListLifeCycleTypes.LIST_LIFECYCLES_GOD_MODE === params[0]) || (type === params[0])) {
                        params[1].call(this, { type, payload, ctx })
                    }
                } else if (params.length === 1) {
                    if (isFn(params[0])) { // handler will triggered everytime
                        params[0].call(this, { type, payload, ctx })
                    } else { // handlerMap
                        Object.keys(params[0]).forEach(key => {
                            if (ListLifeCycleTypes.LIST_LIFECYCLES_GOD_MODE === key || (type === key)) {
                                params[0][key].call(this, { type, payload, ctx })
                            }
                        })
                    }
                }
            }
        }
    }

    notify = (opts: LifeCyclesOptions) => {
        this.handler(opts)
    }
}

// 继承EventEmitter, 实例中包含 on, emit, removeListener等事件方法，用于和UI通信交互
class LifeCylcesCore extends EventEmitter {
    // 优先级：本地dataSource > url > 自定义query
    private lifeCycles: ListLifeCycle[]
    constructor(props: { lifeCycles?: ListLifeCycle[]} = {}) {
        super()
        this.lifeCycles = props.lifeCycles || []
    }

    // 触发生命周期函数
    notify = (opts: LifeCyclesOptions) => {
        this.lifeCycles.forEach(lifeCycles => {
            lifeCycles.notify(opts)
        })
    }

    subscribe = (type: ListLifeCycleTypes, handler: LifeCycleHandler<any>) => {
        const instance = new ListLifeCycle(type, handler)
        this.lifeCycles.push(instance)
        return instance.id
    }

    unSubscribe = (id: string) => {
        this.lifeCycles = this.lifeCycles.filter(item => item.id !== id)
    }
}

export {
    LifeCylcesCore as default,
    ListLifeCycle,
}

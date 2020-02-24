import EventEmitter from 'events'
import { LAZY_MOUNTED_SIGNAL } from '../types'
import { isFn } from '../util'

// 继承EventEmitter, 实例中包含 on, emit, removeListener等事件方法，用于和UI通信交互
export default class LazyAction {
    private cachedActions: any
    private actionPayload: any
    private initialized: boolean
    private emitter: EventEmitter
    constructor() {
        // super()
        this.emitter = new EventEmitter()
        this.cachedActions = null
        this.initialized = false
        this.actionPayload = null

        this.emitter.on(LAZY_MOUNTED_SIGNAL, (payload) => {
            if (isFn(this.cachedActions)) {
                this.actionPayload = payload
                this.cachedActions(payload)
                this.cachedActions = null
                this.initialized = true
                this.emitter.removeAllListeners()
            }
        })
    }

    mounted = (cb: any) => {
        if (isFn(cb)) {
            if (!this.initialized) {
                this.cachedActions = cb
            } else {
                cb(this.actionPayload)
            }
        } else {
            console.warn('callback must be function')
        }
    }
}


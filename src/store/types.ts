import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

// 因为vuex对TS兼容的问题，导致使用原生useStore拿到函数返回值类型不能很好的使用符号（.）调出模块，
// 所以利用交叉类型进行拓展一个IStoreType的类型
export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule

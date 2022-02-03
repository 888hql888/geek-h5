//用于定义处理 redux 相关的 类型
// RootState RootAction RootThunkAction(异步请求)
import store from "@/store";
import { ThunkAction } from "redux-thunk";
import { Token } from "./data";

// 获取 useSeletor 需要的泛型
export type RootState = ReturnType<typeof store.getState>

// 获取RootAction
export type RootAction = loginAction

// 获取RootThunkAction
export type RootThunkAction = ThunkAction<void,RootState,unknown,RootAction>


export type loginAction = {
    type:'login/login'
    payload:Token
}
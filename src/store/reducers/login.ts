import { Token } from "@/types/data"
import { loginAction } from "@/types/store"
import {getToken} from '@/utils/storage'
const initValue:Token = getToken()
export const login = (state=initValue,action:loginAction) => {
    if(action.type==='login/login'){
        return action.payload
    }
    return state
}

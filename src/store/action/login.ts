import { ApiResponse, formValue, Token } from "@/types/data";
import { RootThunkAction } from "@/types/store";
import request from '@/utils/request'
import { setToken } from "@/utils/storage";

export const login = (values:formValue):RootThunkAction=>{
    return async dispatch =>{
        const res = await request.post<ApiResponse<Token>>('/authorizations',values)
        dispatch({
            type:'login/login',
            payload:res.data.data
            
        })
        setToken(res.data.data)
    }
}

export const getCode = (mobile:string):RootThunkAction => {
    return async dispatch => {
        await request.get(`/sms/codes/${mobile}`)
    }
}

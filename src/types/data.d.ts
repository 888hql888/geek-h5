export type formValue = {
    code:string
    mobile:string
}

export type ApiResponse<T> = {
    message:string
    data:T
}

export type Token = {
    token:string
    refresh_token: string
}
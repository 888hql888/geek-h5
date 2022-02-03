import { Token } from '@/types/data'

// 本地存储的封装
const TOKEN_KEY = 'geek-h5-token'

/**
 * 保存token
 * @param token
 */
export function setToken(token: Token): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

/**
 * 获取token
 * @returns
 */
export function getToken(): Token {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

/**
 * 删除token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断是否有token
 * @returns
 */
export function hasToken(): boolean {
  return !!getToken().token
}
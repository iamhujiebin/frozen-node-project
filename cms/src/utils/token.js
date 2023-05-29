const TOKEN_KEY = 'TOKEN'
const USER_KEY = 'USER'
const MOBILE_KEY = 'MOBILE'
const CODE_KEY = 'CODE'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

const setUser = (user) => localStorage.setItem(USER_KEY, user)
const getUser = () => localStorage.getItem(USER_KEY)

const setMobile = (mobile) => localStorage.setItem(MOBILE_KEY, mobile)
const setCode = (code) => localStorage.setItem(CODE_KEY, code)
const getMobile = () => localStorage.getItem(MOBILE_KEY)
const getCode = () => localStorage.getItem(CODE_KEY)

export {getToken, setToken, clearToken, setUser, getUser, setMobile, getMobile, setCode, getCode}
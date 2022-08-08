const TOKEN_KEY = 'FROZEN'
const USRR_KEY = 'USER'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

const setUser = (user) => localStorage.setItem(USRR_KEY, user)
const getUser = () => localStorage.getItem(USRR_KEY)

export { getToken, setToken, clearToken, setUser, getUser }
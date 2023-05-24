const TOKEN_KEY = 'TOKEN'
const USER_KEY = 'USER'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

const setUser = (user) => localStorage.setItem(USER_KEY, user)
const getUser = () => localStorage.getItem(USER_KEY)

export {getToken, setToken, clearToken, setUser, getUser}
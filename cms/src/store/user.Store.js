import {http} from "@/utils"

import {setUser} from "@/utils/token"
import {makeAutoObservable} from "mobx"

class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    userInfo = {}

    async getUserInfo() {
        const res = await http.get('/user/profile')
        console.log('user', res.data)
        this.userInfo = res.data
        setUser(res.data.name)
    }

    async updateUserInfo(name, gender) {
        let genderInt = 0
        if (gender === 'male') {
            genderInt = 1
        }
        if (gender === 'female') {
            genderInt = 2
        }
        let res = false
        await http.put("/user/profile", {"gender": genderInt, "name": name}).then(r => {
            this.userInfo = r.data
            setUser(r.data.name)
            res = true
        }).catch(e => {
            console.log(e)
        })
        return res
    }
}

export default UserStore
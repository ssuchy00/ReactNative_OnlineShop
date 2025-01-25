import { IApiResponse, IUser } from "../Interfaces/IApiResponse"
import APIHandler from "./APIHandler"

export const UserFunction = {
    getUser: async ():Promise<IUser | null> => {
        return null
    },

    setUser: (user:IUser) => {

    },

    login: async (email:string, password:string):Promise<boolean> => {
        const res:IApiResponse<IUser> = await APIHandler.functions.userLogin({email,password}); 
        return res.data?.email!=undefined
    }
}
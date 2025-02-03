import { IUserLogin, IUserRegister } from "../Interfaces/IApiQuery";
import {IApiResponse, IUser } from "../Interfaces/IApiResponse"
import APIHandler from "./APIHandler"
import { SessionHandler } from "./SessionHandler";

export interface IRegisterUser {
    email: string
    firstName: string,
    lastName: string,
    password: string,
    password2: string,
    rules: boolean,
}

export const REGISTER_CALLBACK = {
    nameLength: 0,
    lastnameLength: 1,
    passwordLength: 2,
    checkPassword: 3,
    emailFormat: 4,
    rulesAccepted: 5,
    otherProblem: 6
}

export const REGISTER_CALLBACK_STRING = {
    nameLength: "Imię powinno składać się z co najmniej 3 znaków",
    lastnameLength: "Nazwisko powinno składać się co najmniej z 2 znaków",
    passwordLength: "Hasło powinno składać się z co najmniej 8 znaków",
    checkPassword: "Hasła się różnią",
    emailFormat: "Niepoprawny format adresu e-mail",
    rulesAccepted: "Proszę zaakceptować regulamin",
    otherProblem: "Użytkownik o podanym mailu istnieje"
}

export const UserFunction = {
    getUser: async ():Promise<IUser | null> => {
        const user_str = await SessionHandler.getData("user");
        const user:IUser | null = JSON.parse(user_str??"null")
        //console.log("User_str",user_str)
        return user;
    },

    setUser: (user:IUser) => {

    },

    login: async (data:IUserLogin):Promise<boolean> => {
        const res:IApiResponse<IUser> = await APIHandler.functions.userLogin({email:data.email,password:data.password}); 
        SessionHandler.storeData("user", JSON.stringify(res.data??"null"))
        return res.data?.email!=undefined
    },

    logout: async () => {
        await SessionHandler.storeData("user", "null")
    },

    register: async(data:IRegisterUser):Promise<number> => {
        let ret = 0;
        if(data.firstName.length < 3)ret|=(1<<REGISTER_CALLBACK.nameLength);
        if(data.lastName.length < 2)ret|=(1<<REGISTER_CALLBACK.lastnameLength);
        if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)==false)ret|=(1<<REGISTER_CALLBACK.emailFormat);
        if(data.password.length < 8)ret|=(1<<REGISTER_CALLBACK.passwordLength);
        if(data.password!=data.password2)ret|=(1<<REGISTER_CALLBACK.checkPassword);
        //if(data.rules==false)ret|=(1<<REGISTER_CALLBACK.rulesAccepted);
        
        ////console.log(ret.toString(2), data.rules)
        if(ret!=0)return ret;
        const dataToSend = {user: {
            email: data.email,
            firstName: data.firstName, 
            lastName: data.lastName, 
            password: data.password,
            phoneNumber: "",
            role: "user",
            userId: 0
        }}
        const res:IApiResponse<IUser> = await APIHandler.functions.userRegister(dataToSend)

        if(res.data?.email==undefined)return (1<<REGISTER_CALLBACK.otherProblem)

        return 0
    }
}
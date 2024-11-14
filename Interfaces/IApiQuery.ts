import { IAddress, ICartItem, IUser } from "./IApiResponse"

export interface IAddressAdd {
    address:IAddress
}

export interface IAddressFetch {
    userId:number
}

export interface IAddressDelete {
    addressId:number
}

export interface IBrandsFetch {
    
}

export interface IOrderFetch {
    userId:number
}

export interface IPaymentProcess {
    total:number,
    currency:string,
    paymentId:string,
    userId:number,
    items:Array<ICartItem>
}

export interface ICartFetch {
    userId:number
}

export interface ICartItemAdd {
    cartId:number,
    productId:number,
    quantity:number
}

export interface ICartItemUpdate {
    cartItemId:number,
    quantity:number,
}

export interface ICartItemDelete {
    cartItemId:number
}

export interface ICategoryFetch {

}

export interface IManufacturerFetch {

}

export interface IProductByBrand {
    brandId:number
}

export interface IProductByCategory {
    categoryId:number
}

export interface IProductPopular {

}

export interface IProductSearch {
    searchText:string | null,
    originality:string | null,
    brandId:number | null,
    categoryId:number | null,
    manufacturerId:number | null
}

export interface IUserRegister {
    user: IUser
}

export interface IUserLogin {
    email:string,
    password:string
}

export interface IUserDataUpdate {
    userId:number,
    firstName:string,
    lastName:string,
    phoneNumber:string
}

export interface IUserPasswordChange {
    userId:number,
    newPassword:string
}
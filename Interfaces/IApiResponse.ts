export interface IApiResponse<type> {
    status:number,
    data: type | null
}

export interface IAddress {
    addressId:number
    street:string
    houseNumber:string
    flatNumber:string | null
    postalCode:string
    city:string,
    userId:number
}

export interface IBrand {
    brandId:number,
    name:string,
    logoUrl:string
}

export interface ICart {
    cartId:number,
    userId:number,
    cartItems:Array<ICartItem>
}

export interface ICartItem {
    cartItemId:number,
    product: IProduct,             
    quantity:number
}

export interface ICategory {
    categoryId:number,
    name:string,
    imageUrl:string
}

export interface IManufacturer {
    manufacturerId:number,
    name:string
}

export interface IOrder {
    orderId:number,
    userId:number,
    total:number,
    paymentId:string,
    createdAt:Date,
    status:string,
    orderItems: IOrderItem             
}

export interface IOrderItem {
    orderItemId:number,
    product:IProduct                
    quantity:number
}

export interface IProduct {
    productId:number,
    name:string,
    price:number,
    description:string,
    originality:string,
    categoryId:number,
    manufacturerId:number,
    brandId:number
}

export interface IUser {
    userId:number,
    email:string,
    password:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    role: ERole
}

enum ERole {
    "user",
    "admin"
}


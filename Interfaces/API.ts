export interface Address {
    addressId:number
    street:string
    houseNumber:string
    flatNumber?:string
    postalCode:string
    city:string,
    userId:number
}

export interface Brand {
    brandId:number,
    name:string,
    logoUrl:string
}

export interface Cart {
    cartId:number,
    userId:number,
    cartItems:Array<CartItem>
}

export interface CartItem {
    cartItemId:number,
    product: Product,             
    quantity:number
}

export interface Category {
    categoryId:number,
    name:string,
    imageUrl:string
}

export interface Manufacturer {
    manufacturerId:number,
    name:string
}

export interface Order {
    orderId:number,
    userId:number,
    total:number,
    paymentId:string,
    createdAt:Date,
    status:string,
    orderItems: OrderItem             
}

export interface OrderItem {
    orderItemId:number,
    product:Product                
    quantity:number
}

export interface Product {
    productId:number,
    name:string,
    price:number,
    description:string,
    originality:string,
    categoryId:number,
    manufacturerId:number,
    brandId:number
}

export interface User {
    userId:number,
    email:string,
    password:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    role: Role
}

enum Role {
    user,
    admin
}


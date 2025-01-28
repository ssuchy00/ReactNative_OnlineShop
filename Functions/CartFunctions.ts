import { IApiResponse, ICartRes, IProduct } from "../Interfaces/IApiResponse";
import APIHandler from "./APIHandler";
import { SessionHandler } from "./SessionHandler";
import { UserFunction } from "./UserFunctions";

export interface ICart {
    products: Array<IProduct>
}

export const CartFunctions = {
    AddToCart: async (product: IProduct) : Promise<number> =>{
        const itemsInCart:ICart | null = await CartFunctions.GetCart();
        const newItems = itemsInCart==null ? [product] : [...itemsInCart.products, product];
        SessionHandler.storeData("cart", JSON.stringify(newItems));
        return newItems.filter(f=>f.productId==product.productId).length;
    },
    RemoveFromCart: async (product: IProduct)=>{
        const itemsInCart:ICart | null = await CartFunctions.GetCart(); 
        const newItems = itemsInCart?.products.filter(f=>f.productId!==product.productId);
        console.log(newItems);
        SessionHandler.storeData("cart", JSON.stringify(newItems));
    },
    SubtractFromCart: async (product: IProduct)=>{
        const itemsInCart:ICart | null = await CartFunctions.GetCart();
        const index = itemsInCart?.products.findIndex(i=>i.productId==product.productId)
        if(((index??-1)<0) || index==undefined)return;
        const newItems = itemsInCart?.products.filter((f,k)=>k!=index)
        SessionHandler.storeData("cart", JSON.stringify(newItems));
    },
    GetCart: async () : Promise<ICart | null> =>{
        const itemsInCartStr:string = await SessionHandler.getData("cart")??"[]";
        const itemsInCart:Array<IProduct> = JSON.parse(itemsInCartStr);
        return {products: itemsInCart}
    },

    //API
    AddToCartAPI: async (product:IProduct) : Promise<number> => {
        const user = await UserFunction.getUser()
        if(user==null)return -1;
        const res:IApiResponse<ICartRes> = await APIHandler.functions.cart_add(product, user)
        if(res.status==200)
        {
            console.log(res)
            return 1
        }else{
            return 0 
        }
    },
    GetCartAPI: async () : Promise<ICartRes | null> =>{
        const res:IApiResponse<ICartRes> = await APIHandler.functions.cart_fetch({userId: (await UserFunction.getUser())?.userId??0})
        if(res.status!=200)
        {
            return null;
        }

        return res.data
    },
}
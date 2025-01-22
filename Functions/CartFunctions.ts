import { IProduct } from "../Interfaces/IApiResponse";
import { SessionHandler } from "./SessionHandler";

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
        const newItems = itemsInCart?.products.filter(f=>f.productId!=product.productId);
        SessionHandler.storeData("cart", JSON.stringify(newItems));
    },
    GetCart: async () : Promise<ICart | null> =>{
        const itemsInCartStr:string = await SessionHandler.getData("cart")??"[]";
        const itemsInCart:Array<IProduct> = JSON.parse(itemsInCartStr);
        return {products: itemsInCart}
    }
}
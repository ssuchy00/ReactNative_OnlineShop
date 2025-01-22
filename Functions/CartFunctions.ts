import { IProduct } from "../Interfaces/IApiResponse";
import { SessionHandler } from "./SessionHandler";

export interface ICart {
    products: Array<IProduct>
}

export const CartFunctions = {
    AddToCart: (product: IProduct) : number =>{
        const itemsInCart:ICart | null = CartFunctions.GetCart();
        const newItems = itemsInCart==null ? [product] : [...itemsInCart.products, product];
        SessionHandler.storeData("cart", JSON.stringify(newItems));
        return 0;
    },
    RemoveFromCart: (product: IProduct)=>{
        const itemsInCart:ICart | null = CartFunctions.GetCart();
        const newItems = itemsInCart?.products.filter(f=>f.productId!=product.productId);
        SessionHandler.storeData("cart", JSON.stringify(newItems));
    },
    GetCart: () : ICart | null =>{
        const itemsInCart:string = SessionHandler.getData("cart");
    }
}
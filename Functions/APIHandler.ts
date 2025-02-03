import axios, { AxiosError } from "axios"
import { IAddress, IApiResponse, IBrand, ICartItem, ICartRes, IProduct, IUser } from "../Interfaces/IApiResponse"
import { IBrandsFetch, ICartFetch, ICategoryFetch, IManufacturerFetch, IProductPopular, IProductSearch, IUserLogin, IUserRegister } from "../Interfaces/IApiQuery";
import { ICart } from "./CartFunctions";

const APIHandler = {
    basic_url: "http://192.168.1.17:8080",
    suburls: {
        address: {
            add: "/addresses/address/add",
            fetch: "/addresses/fetch",
            delete: "/addresses/delete"
        },
        brand: {
            fetch: "/brands/fetch"
        },
        cart: {
            fetch: "/carts/cart/fetch",
            item_add: "/carts/cart/item/add",
            item_update: "/carts/cart/item/update",
            item_delete: "/carts/cart/item/delete",
        },
        category: {
            fetch: "/categories/fetch"
        },
        manufacturer: {
            fetch: "/manufacturers/fetch"
        },
        order: {
            fetch: "/orders/fetch"
        },
        payment: {
            process: "/payments/payment/process",
        },
        product: {
            brand: "/products/brand",
            category: "/products/category",
            popular: "/products/popular",
            search: "/products/search"
        },
        user: {
            register: "/users/user/register",
            login: "/users/user/login",
            data_update: "/users/user/data/update",
            password_change: "/users/user/password/change", 
        }
    },
    functions: {
        address_add: async (address:IAddress) => {
            try {
                const res = await axios.post(APIHandler.getUrl(APIHandler.suburls.address.add), address);
                return returnSuccess(res.data);
            }catch(e: unknown) {
                const err = e as AxiosError
                return returnError(err)
            }
        },

        buyNow: async(cart:Array<ICartItem>, user:IUser) => {
            
        },
    
        cart_fetch: async (data:ICartFetch) => {
            const props:string = `/${data.userId}`
            const url = APIHandler.getUrl(APIHandler.suburls.cart.fetch)+props
            try {
                const res = await axios.get(url);
                return returnSuccess(res.data);
            }catch(e:unknown) {
                const err = e as AxiosError
                return returnError(err);
            }
        },

        cart_add: async (product: IProduct, user: IUser, count:number) => {
            const cart:IApiResponse<ICartRes> = await APIHandler.functions.cart_fetch({userId: user.userId});
            const cart_id = cart.data?.cartId??0
            if(cart_id==0)return returnError(null);

            const props = `/${cart_id}/${product.productId}/${count}`;
            const url = await APIHandler.getUrl(APIHandler.suburls.cart.item_add)+props;
            try {
                const res = await axios.post(url)
                return returnSuccess(res.data)
            }catch(e)
            {
                console.warn(url)
                return returnError(e as AxiosError)
            }  
        },

        products_popular: async(data: IProductPopular) => {
            const url = APIHandler.getUrl(APIHandler.suburls.product.popular)
            try {
                const res = await axios.get(url);
                return returnSuccess(res.data);
            }catch(e:unknown) {
                //console.log(url);
                const err = e as AxiosError
                return returnError(err);
            }
        },
        categories: async(data: ICategoryFetch) => {
            const url = APIHandler.getUrl(APIHandler.suburls.category.fetch)
            try {
                const res = await axios.get(url);
                return returnSuccess(res.data);
            }catch(e:unknown) {
                //console.log(url);
                const err = e as AxiosError
                return returnError(err);
            }
        },
        brands: async(data: IBrandsFetch) => {
            const url = APIHandler.getUrl(APIHandler.suburls.brand.fetch)
            try {
                const res = await axios.get(url);
                return returnSuccess(res.data);
            }catch(e:unknown) {
                //console.log(url);
                const err = e as AxiosError
                return returnError(err);
            }
        },
        manufacturers: async(data: IManufacturerFetch) => {
            const url = APIHandler.getUrl(APIHandler.suburls.manufacturer.fetch)
            try {
                const res = await axios.get(url);
                return returnSuccess(res.data);
            }catch(e:unknown) {
                //console.log(url);
                const err = e as AxiosError
                return returnError(err);
            }
        },
        searchProducts: async(data:IProductSearch)=>{
            data.brandId = data.brandId==0?null:data.brandId;
            data.categoryId = data.categoryId==0?null:data.categoryId;
            data.manufacturerId = data.manufacturerId==0?null:data.manufacturerId; 

            const url = APIHandler.getUrl(APIHandler.suburls.product.search) 
            const formData = new FormData();
            Object.entries(data).map((e)=>{
                formData.append(e[0], e[1])
            })
            //console.log(data)
            try {
                const res = await axios.post(url, data);
                //console.log("RES",data)
                let resdata = res.data;
                resdata = resdata.filter((f:IProduct)=>
                    f.description.toLowerCase().includes(data.searchText?.toLowerCase()??"") &&
                    (f.manufacturerId == data.manufacturerId || data.manufacturerId==null) &&
                    (f.brandId == data.brandId || data.brandId==null) &&
                    f.name.toLowerCase().includes(data.searchText?.toLowerCase()??"") &&
                    (f.originality==data.originality || data.originality=="all") &&
                    (f.categoryId==data.categoryId || data.categoryId==null)
                )
                return returnSuccess(resdata);
            }catch(e:unknown) {
                //console.log(url);
                const err = e as AxiosError
                return returnError(err);
            }
        },
        userLogin: async(data:IUserLogin) => {
            const url = APIHandler.getUrl(APIHandler.suburls.user.login)
            try {
                const formData = new FormData();
                //console.log(Object.entries(data).map(e=>e))
                Object.entries(data).map(e=>{
                    formData.append(e[0], e[1])
                })
                //console.log(formData)
                const res = await axios.post(url, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }})  
                return returnSuccess(res.data)
            }catch(e:unknown)
            {
                //console.log(returnError(e as AxiosError));
                //console.log(url)
                return returnError(e as AxiosError)
            }
            
        },

        userRegister: async(data:IUserRegister) => {
            const url = APIHandler.getUrl(APIHandler.suburls.user.register)
            try {
                const formData = new FormData();
                ////console.log(Object.entries(data.user).map(e=>e))
                Object.entries(data.user).map(e=>{
                    formData.append(e[0], e[1])
                })
                //console.log(data.user)
                const res = await axios.post(url, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }})  
                return returnSuccess(res.data)
            }catch(e:unknown)
            {
                //console.log(returnError(e as AxiosError));
                //console.log(url)
                return returnError(e as AxiosError)
            }
            
        }
    },

    getUrl: (_url:string) => {
        return APIHandler.basic_url + _url
    },
}

const returnSuccess = <T>(data:T):IApiResponse<T> => {
    return {data: data, status: 200};
}

const returnError = <T>(e:AxiosError|null):IApiResponse<T> => {
    return {data: null, status: e?.status??1}
}


export default APIHandler
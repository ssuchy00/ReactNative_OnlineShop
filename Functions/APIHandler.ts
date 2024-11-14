import axios, { AxiosError } from "axios"
import { IAddress, IApiResponse, IBrand } from "../Interfaces/IApiResponse"
import { IBrandsFetch, ICartFetch, ICategoryFetch, IManufacturerFetch, IProductPopular } from "../Interfaces/IApiQuery";

const APIHandler = {
    basic_url: "http://192.168.1.8:8080",
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
        products_popular: async(data: IProductPopular) => {
            const url = APIHandler.getUrl(APIHandler.suburls.product.popular)
            try {
                const res = await axios.get(url);
                return returnSuccess(res.data);
            }catch(e:unknown) {
                console.log(url);
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
                console.log(url);
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
                console.log(url);
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
                console.log(url);
                const err = e as AxiosError
                return returnError(err);
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

const returnError = <T>(e:AxiosError):IApiResponse<T> => {
    return {data: null, status: e.status??1}
}


export default APIHandler
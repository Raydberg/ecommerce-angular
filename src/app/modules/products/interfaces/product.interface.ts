import { User } from "@auth/interfaces/user.interface";

// export interface ProductsResponse {
//     products: Product[];
// }

export interface ProductsResponse {
    id:          string;
    name:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    // sizes:       Size[];
    sizes:       string[];
    // gender:      Gender;
    gender:      string;
    tags:        string[] | null;
    images:      string[];
    user:        User;
}

export enum Gender {
    Kid = "KID",
    Men = "MEN",
    Unisex = "UNISEX",
    Women = "WOMEN",
}

export enum Size {
    L = "L",
    M = "M",
    S = "S",
    Xl = "XL",
    Xs = "XS",
    Xxl = "XXL",
}

// export enum Tag {
//     Hats = "hats",
//     Hoodie = "hoodie",
//     Jacket = "jacket",
//     Shirt = "shirt",
// }

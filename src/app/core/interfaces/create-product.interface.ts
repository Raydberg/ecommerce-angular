
type GENDER = 'MEN' | 'WOMEN'

export interface CreateProduct {
    name: string
    price?: number
    description?: string
    slug?: string
    stock?: number;
    sizes: string[];
    gender: 'MEN' | 'WOMEN';
    tags?: string[];

    images?: string[];
}
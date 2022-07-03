export type ProductType = {
    id: string;
    name: string;
}

export type ProductTypes = Record<ProductType['id'], ProductType>;

export type PriceSizeProduct = {
    price: number;
    size: string;
    isActive: boolean;
}


export interface ProductModel {
    id: string;
    assessment: number;
    quantityAssessment: number;
    name: string;
    typeProduct: string; 
    description: string;
    prices: PriceSizeProduct[];
    category: string;
    isActive: boolean;
    imageMediumUrl: string;
    imageSmallUrl: string;

}
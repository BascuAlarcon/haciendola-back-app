import { IsString } from "class-validator";



export class CreateProductDto {

    @IsString()
    handle: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    sku: string;

    @IsString()
    grams: string;

    @IsString()
    stock: string;

    @IsString()
    price: string;

    @IsString()
    compare: string;

    @IsString()
    barcode: string;
}

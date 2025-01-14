import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    complement: string;

    @IsNotEmpty()
    @IsString()
    numberAddress: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    cep: string;

    @IsNotEmpty()
    @IsInt()
    cityId: number 
}
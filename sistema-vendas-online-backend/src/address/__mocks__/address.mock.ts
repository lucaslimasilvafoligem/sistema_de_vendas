import { userEntityMock } from "../../user/__mocks__/user.mock";
import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";

export const addressMock: AddressEntity = {
    id: 57546,
    userId: userEntityMock.id,
    complement: "Ao lado da padria",
    numberAddress: "143",
    cep: '433253252',
    cityId: cityMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
}
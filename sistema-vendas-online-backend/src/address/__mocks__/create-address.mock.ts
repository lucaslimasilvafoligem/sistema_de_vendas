import { CreateAddressDto } from '../dtos/createAddress.dto';
import { addressMock } from './address.mock';

export const createAddressMock: CreateAddressDto = {
  cep: addressMock.cep,
  cityId: addressMock.cityId,
  complement: addressMock.complement,
  numberAddress: addressMock.numberAddress,
};

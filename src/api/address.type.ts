export type AddressDTO = {
  uuid: string;
  plz: string;
  street: string;
  houseNumber: string;
  city: string;
};

export type CreateAddressDTO = Omit<AddressDTO, "uuid">;
export type UpdateAddressDTO = Partial<Omit<AddressDTO, "uuid">>;

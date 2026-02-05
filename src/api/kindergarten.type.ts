import { GroupDTO } from "./group.type";
import { AddressDTO, CreateAddressDTO } from "./address.type";
import { EducatorDTO } from "./educator.type";

export type KindergartenDTO = {
  uuid: string;
  kindergartenName: string;
  address: AddressDTO;
  groups: GroupDTO[];
  educators: EducatorDTO[];
};

export type CreateKindergartenDTO = {
  kindergartenName: string;
  address: CreateAddressDTO;
};
export type UpdateKindergartenDTO = Partial<Omit<KindergartenDTO, "uuid">>;

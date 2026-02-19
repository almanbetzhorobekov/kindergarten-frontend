import { Person } from "./person.type";
import { AddressDTO } from "./address.type";
import { GroupDTO } from "./group.type";

export type EducatorDTO = Person & {
  uuid: string;
  email: string;
  phoneNumber: string;
  kindergartenId: string;
  groupIds: GroupDTO[];
  addressDTO: AddressDTO;
};

export type CreateEducatorDTO = Omit<EducatorDTO, "uuid" | "groupIds"> & {
  groupIds: string[];
};
export type UpdateEducatorDTO = Partial<CreateEducatorDTO>;

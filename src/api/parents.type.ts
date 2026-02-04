import { AddressDTO } from "./address.type";
import { Person } from "./person.type";
import { ChildDTO } from "./child.type";

export type ParentsDTO = Person & {
  uuid: string;
  addressDTO: AddressDTO;
  childrenId: ChildDTO[];
  phoneNumber: string;
};

export type CreateParentsDTO = Omit<ParentsDTO, "uuid">;
export type UpdateParentsDTO = Partial<Omit<ParentsDTO, "uuid">>;

import { AddressDTO, CreateAddressDTO } from "./address.type";
import { Person } from "./person.type";
import { ChildDTO } from "./child.type";

export type ParentsDTO = Person & {
  uuid: string;
  addressDTO: AddressDTO;
  childrenId: ChildDTO[];
  phoneNumber: string;
};

export type CreateParentsDTO = Person & {
  addressDTO: CreateAddressDTO;
  childrenId: string[];
  phoneNumber: string;
};

export type UpdateParentsDTO = Partial<Person> & {
  addressDTO?: Partial<CreateAddressDTO>;
  childrenId?: string[];
  phoneNumber?: string;
};

export interface ParentsFormProps {
  onAddParent?: (parent: ParentsDTO) => void;
}

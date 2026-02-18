import { AddressDTO, CreateAddressDTO } from "./address.type";
import { Person } from "./person.type";
import { ChildDTO } from "./child.type";

export type ParentsDTO = Person & {
  uuid: string;
  addressDTO: AddressDTO;
  childrenId: ChildDTO[];
  phoneNumber: string;
};

export type CreateParentsDTO = Omit<
  ParentsDTO,
  "uuid" | "addressDTO" | "childrenId"
> & {
  addressDTO: CreateAddressDTO;

  childrenId: string[];
};
/*export type UpdateParentsDTO = Partial<
  Omit<ParentsDTO, "uuid" | "addressDTO" | "childrenId">
> & {
  addressDTO?: Partial<CreateAddressDTO>;
  childrenId?: string[];
};*/
export type UpdateParentsDTO = Person & {
  addressDTO?: {
    plz?: string;
    street?: string;
    houseNumber?: string;
    city?: string;
  };
  childrenId: string[];
  phoneNumber: string;
};

export type ParentsFormProps = {
  onAddParent: (parents: ParentsDTO) => void;
};

export type ParentsFormValues = CreateParentsDTO;

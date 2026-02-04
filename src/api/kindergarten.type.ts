import { GroupDTO } from "./group.type";
import { AddressDTO } from "./address.type";
import { EducatorDTO } from "./educator.type";

export type KindergartenDTO = {
  uuid: string;
  kindergartenName: string;
  address: AddressDTO;
  groups: GroupDTO[];
  educators: EducatorDTO[];
};

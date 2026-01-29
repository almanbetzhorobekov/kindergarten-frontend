import { GroupDTO } from "./group.type";
export type KindergartenDTO = {
  uuid: string;
  kindergartenName: string;
  // TODO address: AddressDTO
  address: unknown;
  // TODO groups: GroupDTO[]
  groups: GroupDTO[];
  // TODO educators: EducatorDTO[]
  educators: unknown[];
};

import { ChildDTO } from "./child.type";

export type GroupDTO = {
  uuid: string;
  groupName: string;
  childList: ChildDTO[];
  kindergartenId: string;
  kindergartenName: string;
  educatorId: string;
};

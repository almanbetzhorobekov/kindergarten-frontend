import { Person } from "./person.type";

export type ChildDTO = Person & {
  uuid: string;
  parentsId: string[];
  groupId: string;
};

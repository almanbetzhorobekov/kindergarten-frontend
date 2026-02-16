import { UpdateKindergartenDTO } from "api/kindergarten.type";

export type KindergartenEditFormValues = {
  kindergartenName: string;
  plz: string;
  street: string;
  houseNumber: string;
  city: string;
};

export type KindergartenEditFormProps = {
  kindergarten: {
    uuid: string;
    kindergartenName: string;
    address: {
      plz: string;
      street: string;
      houseNumber: string;
      city: string;
    };
  };
  onSave: (uuid: string, data: UpdateKindergartenDTO) => void;
  onCancel: () => void;
};

export function mapFormToUpdateKindergarten(
  data: KindergartenEditFormValues,
): UpdateKindergartenDTO {
  return {
    kindergartenName: data.kindergartenName,
    address: {
      plz: data.plz,
      street: data.street,
      houseNumber: data.houseNumber,
      city: data.city,
    },
  };
}

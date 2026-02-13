import { UpdateKindergartenDTO } from "api/kindergarten.type";
import { UpdateAddressDTO } from "api/address.type";

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
      uuid: string;
      plz: string;
      street: string;
      houseNumber: string;
      city: string;
    };
  };
  onSave: (
    uuid: string,
    data: UpdateKindergartenDTO,
    addressUuid: string,
    addressData: UpdateAddressDTO,
  ) => void;
  onCancel: () => void;
};

export function mapFormToUpdateKindergarten(data: KindergartenEditFormValues): {
  kindergarten: UpdateKindergartenDTO;
  address: UpdateAddressDTO;
} {
  return {
    kindergarten: {
      kindergartenName: data.kindergartenName,
    },
    address: {
      plz: data.plz,
      street: data.street,
      houseNumber: data.houseNumber,
      city: data.city,
    },
  };
}

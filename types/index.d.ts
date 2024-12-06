declare interface childrenProps {
  children: React.ReactNode;
}
declare interface navbarProps {
  navClass?: string;
  navJustify?: string;
}

declare interface newsletterFormProps {
  onSubmit: React.FormEventHandler;
  onChangeEmail: React.ChangeEventHandler;
  email: string;
  loading: boolean;
  showConfirmationMsg: boolean;
}

declare interface lead {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  ProjectCode: string;
  additionalData?: { additionalData };
  created_by: number;
  updated_by: number;
}

declare interface accordionData {
  IsParrainageSelected?: boolean;
  TelephoneParrain?: string;
  TypeDeBien?: string;
  anneDeContruction?: number;
  typeDeChauffage?: string;
  delai?: string;
  superficie?: string;
  revenue?: string;
  nbrePerson?: number;
  dpe?: string;
  TypeDeBienAutre?: string;
  DescriptifTravaux?: string;
  dateRDV?: string;
  typeRappel?: string;
  LeadType?: string;
}

declare interface Revenue {
  label: string;
  value: string;
}
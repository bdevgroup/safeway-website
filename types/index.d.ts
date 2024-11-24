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

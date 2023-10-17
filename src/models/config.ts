import type {
  ColorStyle,
  Edges,
  Locale,
  TapCurrencyCode,
  Theme,
} from './enums';

export type Merchant = { id: String };
export type PaymentAgreement = {
  id: String;
  contract: Contract;
};
export type Contract = {
  id: String;
};

export type Phone = { countryCode: String; number: String };

export type InterfaceConfig = {
  locale: Locale;
  theme: Theme;
  edges: Edges;
  loader: boolean;
  colorStyle: ColorStyle;
};

export type Contact = {
  email: String;
  phone: Phone;
};
export type Name = {
  lang: Locale;
  first: String;
  last: String;
  middle: String;
};
export type Customer = {
  id?: String;
  name?: Name[];
  nameOnCard?: String;
  editable?: boolean;
  contact?: Contact;
};

export type Order = {
  id?: String;
  amount?: number;
  currency?: TapCurrencyCode;
  description?: String;
  reference?: String;
  metadata?: Object;
};

export type Invoice = {
  id: String;
};

export type Post = {
  url: String;
};

export type Config = {
  merchant?: Merchant;
  order: Order;
  invoice?: Invoice;
  post?: Post;
  operator: { publicKey: string; hashString: string };
  interface?: InterfaceConfig;
  customer: Customer;
};

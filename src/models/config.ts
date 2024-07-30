import type { Edges, Locale, TapCurrencyCode } from './enums';

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
  edges: Edges;
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
  names?: Name[];
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
  post?: Post;
  operator: { publicKey: string; hashString: string };
  interface?: InterfaceConfig;
  customer: Customer;
  transaction: { amount: number; currency: TapCurrencyCode };
  reference: { transaction: string; order: string };
};

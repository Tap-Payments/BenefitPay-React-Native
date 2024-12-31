import type { Edges, Locale, TapCurrencyCode } from './enums';

interface Name {
  middle?: string;
  last?: string;
  lang?: string;
  first?: string;
}

interface Phone {
  number: string;
  countryCode: string;
}

interface Contact {
  phone: Phone;
  email: string;
}

interface CustomerBase {
  id: string | null;
}

interface CustomerWithId extends CustomerBase {
  id: string;
  names?: Name[];
  contact?: Contact;
}

interface CustomerWithoutId extends CustomerBase {
  id: null;
  names: Name[];
  contact: Contact;
}

type Customer = CustomerWithId | CustomerWithoutId;

interface Reference {
  transaction: string;
  order: string;
}

interface Post {
  url: string;
}

interface Transaction {
  amount: string;
  currency: TapCurrencyCode;
}

export interface Operator {
  hashString: string;
  publicKey: string;
}

interface Interface {
  edges: Edges;
  locale: Locale;
}

interface Merchant {
  id: string;
}

export interface ConfigSettings {
  merchant: Merchant;
  redirect: string;
  customer: Customer;
  interface: Interface;
  reference: Reference;
  metadata: string;
  post: Post;
  transaction: Transaction;
  iOSOperator: Operator;
  androidOperator: Operator;
}

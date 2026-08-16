import store from "@/content/config/store.json";
import contact from "@/content/config/contact.json";
import address from "@/content/config/address.json";
import social from "@/content/config/social.json";
import seo from "@/content/config/seo.json";
import branding from "@/content/config/branding.json";
import status from "@/content/config/store-status.json";
import businessHours from "@/content/config/business-hours.json";
import shipping from "@/content/config/shipping.json";
import paymentMethods from "@/content/config/payment-methods.json";

import type { StoreCore } from "@/src/types/store";
import type { Contact } from "@/src/types/contact";
import type { Address } from "@/src/types/address";
import type { Social } from "@/src/types/social";
import type { Seo } from "@/src/types/seo";
import type { Branding } from "@/src/types/branding";
import type { Status } from "@/src/types/store-status";
import type { BusinessHours } from "@/src/types/business-hours";
import type { Shipping } from "@/src/types/shipping";
import type { PaymentMethods } from "@/src/types/payment-methods";
import type { Testimonial } from "@/src/types/testimonials";

export interface StoreConfig {
  store: StoreCore;
  contact: Contact;
  address: Address;
  social: Social;
  seo: Seo;
  branding: Branding;
  status: Status;
  businessHours: BusinessHours;
  shipping: Shipping;
  paymentMethods: PaymentMethods;
}

export function getStoreConfig(): StoreConfig {
  return {
    store: store as StoreCore,
    contact: contact as Contact,
    address: address as Address,
    social: social as Social,
    seo: seo as Seo,
    branding: branding as Branding,
    status: status as Status,
    businessHours: businessHours as BusinessHours,
    shipping: shipping as Shipping,
    paymentMethods: paymentMethods as PaymentMethods,
  };
}
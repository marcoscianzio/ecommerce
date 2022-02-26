import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRAPI_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

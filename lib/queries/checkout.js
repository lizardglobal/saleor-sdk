"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutProductVariants = exports.userCheckoutTokenList = exports.checkoutDetails = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const checkout_1 = require("../fragments/checkout");
exports.checkoutDetails = graphql_tag_1.default `
  ${checkout_1.checkoutFragment}
  query CheckoutDetails($token: UUID!) {
    checkout(token: $token) {
      ...Checkout
    }
  }
`;
exports.userCheckoutTokenList = graphql_tag_1.default `
  query UserCheckoutTokenList($channel: String) {
    me {
      id
      checkoutTokens(channel: $channel)
    }
  }
`;
exports.checkoutProductVariants = graphql_tag_1.default `
  ${checkout_1.checkoutProductVariantFragment}
  query CheckoutProductVariants($ids: [ID!], $channel: String) {
    productVariants(ids: $ids, first: 100, channel: $channel) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
  }
`;
//# sourceMappingURL=checkout.js.map
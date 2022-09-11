"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantsProducts = exports.productDetails = exports.productList = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const pageInfo_1 = require("../fragments/pageInfo");
const products_1 = require("../fragments/products");
exports.productList = graphql_tag_1.default `
  ${products_1.baseProductFragment}
  ${products_1.productPricingFragment}
  ${pageInfo_1.pageInfo}
  query ProductList(
    $after: String
    $first: Int!
    $sortBy: ProductOrder
    $filter: ProductFilterInput
    $channel: String
  ) {
    products(
      after: $after
      first: $first
      sortBy: $sortBy
      filter: $filter
      channel: $channel
    ) {
      edges {
        node {
          ...BaseProduct
          ...ProductPricingField
        }
      }
      totalCount
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
exports.productDetails = graphql_tag_1.default `
  ${products_1.productFragment}
  query ProductDetails(
    $id: ID
    $slug: String
    $countryCode: CountryCode
    $channel: String
    $variantSelection: VariantAttributeScope = ALL
  ) {
    product(id: $id, slug: $slug, channel: $channel) {
      ...ProductDetails
    }
  }
`;
exports.variantsProducts = graphql_tag_1.default `
  query VariantsProducts($ids: [ID], $channel: String) {
    productVariants(ids: $ids, first: 100, channel: $channel) {
      edges {
        node {
          id
          product {
            id
            productType {
              isShippingRequired
            }
          }
        }
      }
    }
  }
`;
//# sourceMappingURL=products.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFragment = exports.productPricingFragment = exports.productVariantFragment = exports.selectedAttributeFragment = exports.baseProductFragment = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const checkout_1 = require("./checkout");
exports.baseProductFragment = graphql_tag_1.default `
  fragment BaseProduct on Product {
    id
    name
    slug
    seoDescription
    isAvailableForPurchase
    availableForPurchase
    seoTitle
    thumbnail {
      url
      alt
    }
    thumbnail2x: thumbnail(size: 510) {
      url
    }
  }
`;
exports.selectedAttributeFragment = graphql_tag_1.default `
  fragment SelectedAttributeFields on SelectedAttribute {
    attribute {
      id
      name
      slug
    }
    values {
      id
      name
    }
  }
`;
exports.productVariantFragment = graphql_tag_1.default `
  ${checkout_1.checkoutPriceFragment}
  fragment ProductVariantFields on ProductVariant {
    id
    sku
    name
    quantityAvailable(countryCode: $countryCode)
    images {
      id
      url
      alt
    }
    pricing {
      onSale
      priceUndiscounted {
        ...Price
      }
      price {
        ...Price
      }
    }
    attributes(variantSelection: $variantSelection) {
      attribute {
        id
        name
        slug
      }
      values {
        id
        name
        value: name
      }
    }
  }
`;
exports.productPricingFragment = graphql_tag_1.default `
  ${checkout_1.checkoutPriceFragment}
  fragment ProductPricingField on Product {
    pricing {
      onSale
      priceRangeUndiscounted {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
      priceRange {
        start {
          ...Price
        }
        stop {
          ...Price
        }
      }
    }
  }
`;
exports.productFragment = graphql_tag_1.default `
  ${exports.baseProductFragment}
  ${exports.selectedAttributeFragment}
  ${exports.productVariantFragment}
  ${exports.productPricingFragment}
  fragment ProductDetails on Product {
    ...BaseProduct
    ...ProductPricingField
    description
    category {
      id
      name
      slug
      products(first: 3, channel: $channel) {
        edges {
          node {
            ...BaseProduct
            ...ProductPricingField
            category {
              id
              name
              slug
            }
          }
        }
      }
    }
    images {
      id
      url
    }
    attributes {
      ...SelectedAttributeFields
    }
    variants {
      ...ProductVariantFields
    }
    isAvailable
  }
`;
//# sourceMappingURL=products.js.map
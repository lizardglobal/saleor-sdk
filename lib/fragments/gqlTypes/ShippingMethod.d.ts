export interface ShippingMethod_price {
    __typename: "Money";
    /**
     * Currency code.
     */
    currency: string;
    /**
     * Amount of money.
     */
    amount: number;
}
export interface ShippingMethod {
    __typename: "ShippingMethod";
    /**
     * The ID of the object.
     */
    id: string;
    name: string;
    /**
     * The price of the cheapest variant (including discounts).
     */
    price: ShippingMethod_price | null;
}

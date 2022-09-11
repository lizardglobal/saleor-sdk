export interface UserCheckoutTokenList_me {
    __typename: "User";
    /**
     * The ID of the object.
     */
    id: string;
    /**
     * Returns the checkout UUID's assigned to this user.
     */
    checkoutTokens: any[] | null;
}
export interface UserCheckoutTokenList {
    /**
     * Return the currently authenticated user.
     */
    me: UserCheckoutTokenList_me | null;
}
export interface UserCheckoutTokenListVariables {
    channel?: string | null;
}

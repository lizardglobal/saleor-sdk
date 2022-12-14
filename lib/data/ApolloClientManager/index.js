"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloClientManager = void 0;
const globalTypes_1 = require("../../gqlTypes/globalTypes");
const AuthMutations = __importStar(require("../../mutations/auth"));
const UserMutations = __importStar(require("../../mutations/user"));
const CheckoutMutations = __importStar(require("../../mutations/checkout"));
const CheckoutQueries = __importStar(require("../../queries/checkout"));
const UserQueries = __importStar(require("../../queries/user"));
const utils_1 = require("../../utils");
class ApolloClientManager {
    constructor(client) {
        this.subscribeToUserChange = (next, error, complete) => {
            this.client
                .watchQuery({
                fetchPolicy: "cache-only",
                query: UserQueries.getUserDetailsQuery,
            })
                .subscribe(value => { var _a; return next((_a = value.data) === null || _a === void 0 ? void 0 : _a.me); }, error, complete);
        };
        this.getUser = () => __awaiter(this, void 0, void 0, function* () {
            const { data, errors } = yield this.client.query({
                fetchPolicy: "network-only",
                query: UserQueries.getUserDetailsQuery,
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            return {
                data: data === null || data === void 0 ? void 0 : data.me,
            };
        });
        this.registerAccount = (email, password, redirectUrl) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: UserMutations.registerAccount,
                variables: {
                    email,
                    password,
                    redirectUrl,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_a = data === null || data === void 0 ? void 0 : data.accountRegister) === null || _a === void 0 ? void 0 : _a.accountErrors.length) {
                return {
                    error: data.accountRegister.accountErrors,
                };
            }
            return {
                data: {
                    requiresConfirmation: (_b = data === null || data === void 0 ? void 0 : data.accountRegister) === null || _b === void 0 ? void 0 : _b.requiresConfirmation,
                },
            };
        });
        this.resetPasswordRequest = (email, redirectUrl) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: UserMutations.resetPasswordRequest,
                variables: {
                    email,
                    redirectUrl,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_c = data === null || data === void 0 ? void 0 : data.requestPasswordReset) === null || _c === void 0 ? void 0 : _c.accountErrors.length) {
                return {
                    error: data.requestPasswordReset.accountErrors,
                };
            }
            return {};
        });
        this.signIn = (email, password) => __awaiter(this, void 0, void 0, function* () {
            var _d, _e, _f, _g;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.tokenAuthMutation,
                variables: {
                    email,
                    password,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_d = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _d === void 0 ? void 0 : _d.errors.length) {
                return {
                    error: data.tokenCreate.errors,
                };
            }
            return {
                data: {
                    csrfToken: (_e = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _e === void 0 ? void 0 : _e.csrfToken,
                    token: (_f = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _f === void 0 ? void 0 : _f.token,
                    user: (_g = data === null || data === void 0 ? void 0 : data.tokenCreate) === null || _g === void 0 ? void 0 : _g.user,
                },
            };
        });
        this.signOut = () => __awaiter(this, void 0, void 0, function* () {
            yield this.client.resetStore();
        });
        this.verifySignInToken = ({ token }) => __awaiter(this, void 0, void 0, function* () {
            var _h, _j, _k, _l;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.tokenVeryficationMutation,
                variables: {
                    token,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_h = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _h === void 0 ? void 0 : _h.errors.length) {
                return {
                    error: data.tokenVerify.errors,
                };
            }
            return {
                data: {
                    isValid: (_j = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _j === void 0 ? void 0 : _j.isValid,
                    payload: (_k = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _k === void 0 ? void 0 : _k.payload,
                    user: (_l = data === null || data === void 0 ? void 0 : data.tokenVerify) === null || _l === void 0 ? void 0 : _l.user,
                },
            };
        });
        this.refreshSignInToken = ({ csrfToken, refreshToken, }) => __awaiter(this, void 0, void 0, function* () {
            var _m, _o, _p;
            const { data, errors } = yield this.client.mutate({
                fetchPolicy: "no-cache",
                mutation: AuthMutations.tokenRefreshMutation,
                variables: {
                    csrfToken,
                    refreshToken,
                },
            });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                return {
                    error: errors,
                };
            }
            if ((_m = data === null || data === void 0 ? void 0 : data.tokenRefresh) === null || _m === void 0 ? void 0 : _m.errors.length) {
                return {
                    error: data.tokenRefresh.errors,
                };
            }
            return {
                data: {
                    token: (_o = data === null || data === void 0 ? void 0 : data.tokenRefresh) === null || _o === void 0 ? void 0 : _o.token,
                    user: (_p = data === null || data === void 0 ? void 0 : data.tokenRefresh) === null || _p === void 0 ? void 0 : _p.user,
                },
            };
        });
        this.getCheckout = (isUserSignedIn, channel, checkoutToken) => __awaiter(this, void 0, void 0, function* () {
            let checkout;
            try {
                checkout = yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    var _q;
                    let token = checkoutToken;
                    if (isUserSignedIn) {
                        const { data, errors } = yield this.client.query({
                            fetchPolicy: "network-only",
                            query: CheckoutQueries.userCheckoutTokenList,
                            variables: {
                                channel,
                            },
                        });
                        if (errors === null || errors === void 0 ? void 0 : errors.length) {
                            reject(errors);
                        }
                        else if ((_q = data.me) === null || _q === void 0 ? void 0 : _q.checkoutTokens) {
                            [token] = data.me.checkoutTokens;
                        }
                    }
                    if (token) {
                        const observable = this.client.watchQuery({
                            fetchPolicy: "network-only",
                            query: CheckoutQueries.checkoutDetails,
                            variables: {
                                token,
                            },
                        });
                        observable.subscribe(result => {
                            const { data, errors } = result;
                            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                                reject(errors);
                            }
                            else {
                                resolve(data.checkout);
                            }
                        }, error => {
                            reject(error);
                        });
                    }
                    else {
                        resolve(null);
                    }
                }));
                if (checkout) {
                    return {
                        data: this.constructCheckoutModel(checkout),
                    };
                }
            }
            catch (error) {
                return {
                    error,
                };
            }
            return {};
        });
        this.getRefreshedCheckoutLines = (checkoutlines, channel) => __awaiter(this, void 0, void 0, function* () {
            const idsOfMissingVariants = checkoutlines === null || checkoutlines === void 0 ? void 0 : checkoutlines.filter(line => !line.variant || !line.totalPrice).map(line => line.variant.id);
            const linesWithProperVariant = (checkoutlines === null || checkoutlines === void 0 ? void 0 : checkoutlines.filter(line => line.variant && line.totalPrice)) || [];
            let variants;
            if (idsOfMissingVariants && idsOfMissingVariants.length) {
                try {
                    const observable = this.client.watchQuery({
                        query: CheckoutQueries.checkoutProductVariants,
                        variables: {
                            channel,
                            ids: idsOfMissingVariants,
                        },
                    });
                    variants = yield new Promise((resolve, reject) => {
                        observable.subscribe(result => {
                            const { data, errors } = result;
                            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                                reject(errors);
                            }
                            else {
                                resolve(data.productVariants);
                            }
                        }, error => {
                            reject(error);
                        });
                    });
                }
                catch (error) {
                    return {
                        error,
                    };
                }
            }
            const linesWithMissingVariantUpdated = variants
                ? variants.edges.map(edge => {
                    var _a;
                    const existingLine = checkoutlines === null || checkoutlines === void 0 ? void 0 : checkoutlines.find(line => line.variant.id === edge.node.id);
                    const variantPricing = (_a = edge.node.pricing) === null || _a === void 0 ? void 0 : _a.price;
                    const totalPrice = variantPricing
                        ? {
                            gross: Object.assign(Object.assign({}, variantPricing.gross), { amount: variantPricing.gross.amount * ((existingLine === null || existingLine === void 0 ? void 0 : existingLine.quantity) || 0) }),
                            net: Object.assign(Object.assign({}, variantPricing.net), { amount: variantPricing.net.amount * ((existingLine === null || existingLine === void 0 ? void 0 : existingLine.quantity) || 0) }),
                        }
                        : null;
                    return {
                        id: existingLine === null || existingLine === void 0 ? void 0 : existingLine.id,
                        quantity: (existingLine === null || existingLine === void 0 ? void 0 : existingLine.quantity) || 0,
                        totalPrice,
                        variant: {
                            attributes: edge.node.attributes,
                            id: edge.node.id,
                            name: edge.node.name,
                            pricing: edge.node.pricing,
                            product: edge.node.product,
                            quantityAvailable: edge.node.quantityAvailable,
                            sku: edge.node.sku,
                        },
                    };
                })
                : [];
            const linesWithProperVariantUpdated = linesWithProperVariant.map(line => {
                var _a;
                const variantPricing = (_a = line.variant.pricing) === null || _a === void 0 ? void 0 : _a.price;
                const totalPrice = variantPricing
                    ? {
                        gross: Object.assign(Object.assign({}, variantPricing.gross), { amount: variantPricing.gross.amount * line.quantity }),
                        net: Object.assign(Object.assign({}, variantPricing.net), { amount: variantPricing.net.amount * line.quantity }),
                    }
                    : null;
                return {
                    id: line.id,
                    quantity: line.quantity,
                    totalPrice,
                    variant: line.variant,
                };
            });
            return {
                data: [
                    ...linesWithMissingVariantUpdated,
                    ...linesWithProperVariantUpdated,
                ],
            };
        });
        this.createCheckout = (email, lines, channel, shippingAddress, billingAddress) => __awaiter(this, void 0, void 0, function* () {
            var _r, _s, _t, _u, _v;
            try {
                const variables = {
                    checkoutInput: {
                        billingAddress: billingAddress && {
                            city: billingAddress.city,
                            companyName: billingAddress.companyName,
                            country: globalTypes_1.CountryCode[(_r = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _r === void 0 ? void 0 : _r.code],
                            countryArea: billingAddress.countryArea,
                            firstName: billingAddress.firstName,
                            lastName: billingAddress.lastName,
                            phone: billingAddress.phone,
                            postalCode: billingAddress.postalCode,
                            streetAddress1: billingAddress.streetAddress1,
                            streetAddress2: billingAddress.streetAddress2,
                        },
                        channel,
                        email,
                        lines,
                        shippingAddress: shippingAddress && {
                            city: shippingAddress.city,
                            companyName: shippingAddress.companyName,
                            country: globalTypes_1.CountryCode[(_s = shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) === null || _s === void 0 ? void 0 : _s.code],
                            countryArea: shippingAddress.countryArea,
                            firstName: shippingAddress.firstName,
                            lastName: shippingAddress.lastName,
                            phone: shippingAddress.phone,
                            postalCode: shippingAddress.postalCode,
                            streetAddress1: shippingAddress.streetAddress1,
                            streetAddress2: shippingAddress.streetAddress2,
                        },
                    },
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.createCheckoutMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_t = data === null || data === void 0 ? void 0 : data.checkoutCreate) === null || _t === void 0 ? void 0 : _t.errors.length) {
                    return {
                        error: (_u = data === null || data === void 0 ? void 0 : data.checkoutCreate) === null || _u === void 0 ? void 0 : _u.errors,
                    };
                }
                if ((_v = data === null || data === void 0 ? void 0 : data.checkoutCreate) === null || _v === void 0 ? void 0 : _v.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutCreate.checkout),
                    };
                }
            }
            catch (error) {
                return {
                    error,
                };
            }
            return {};
        });
        this.setCartItem = (checkout) => __awaiter(this, void 0, void 0, function* () {
            var _w, _x, _y;
            const checkoutId = checkout.id;
            const { lines } = checkout;
            if (checkoutId && lines) {
                const alteredLines = lines.map(line => ({
                    quantity: line.quantity,
                    variantId: line.variant.id,
                }));
                try {
                    const { data, errors } = yield this.client.mutate({
                        mutation: CheckoutMutations.updateCheckoutLineMutation,
                        variables: {
                            checkoutId,
                            lines: alteredLines,
                        },
                    });
                    if (errors === null || errors === void 0 ? void 0 : errors.length) {
                        return {
                            error: errors,
                        };
                    }
                    if ((_w = data === null || data === void 0 ? void 0 : data.checkoutLinesUpdate) === null || _w === void 0 ? void 0 : _w.errors.length) {
                        return {
                            error: (_x = data === null || data === void 0 ? void 0 : data.checkoutLinesUpdate) === null || _x === void 0 ? void 0 : _x.errors,
                        };
                    }
                    if ((_y = data === null || data === void 0 ? void 0 : data.checkoutLinesUpdate) === null || _y === void 0 ? void 0 : _y.checkout) {
                        return {
                            data: this.constructCheckoutModel(data.checkoutLinesUpdate.checkout),
                        };
                    }
                }
                catch (error) {
                    return {
                        error,
                    };
                }
            }
            return {};
        });
        this.setShippingAddress = (shippingAddress, email, checkoutId, channel) => __awaiter(this, void 0, void 0, function* () {
            var _z, _0, _1, _2, _3, _4;
            try {
                const variables = {
                    channel,
                    checkoutId,
                    email,
                    shippingAddress: {
                        city: shippingAddress.city,
                        companyName: shippingAddress.companyName,
                        country: globalTypes_1.CountryCode[(_z = shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) === null || _z === void 0 ? void 0 : _z.code],
                        countryArea: shippingAddress.countryArea,
                        firstName: shippingAddress.firstName,
                        lastName: shippingAddress.lastName,
                        phone: shippingAddress.phone,
                        postalCode: shippingAddress.postalCode,
                        streetAddress1: shippingAddress.streetAddress1,
                        streetAddress2: shippingAddress.streetAddress2,
                    },
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutShippingAddressMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_0 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _0 === void 0 ? void 0 : _0.errors.length) {
                    return {
                        error: (_1 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _1 === void 0 ? void 0 : _1.errors,
                    };
                }
                if ((_2 = data === null || data === void 0 ? void 0 : data.checkoutShippingAddressUpdate) === null || _2 === void 0 ? void 0 : _2.errors.length) {
                    return {
                        error: (_3 = data === null || data === void 0 ? void 0 : data.checkoutShippingAddressUpdate) === null || _3 === void 0 ? void 0 : _3.errors,
                    };
                }
                if ((_4 = data === null || data === void 0 ? void 0 : data.checkoutShippingAddressUpdate) === null || _4 === void 0 ? void 0 : _4.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutShippingAddressUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setBillingAddress = (billingAddress, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _5, _6, _7, _8;
            try {
                const variables = {
                    billingAddress: {
                        city: billingAddress.city,
                        companyName: billingAddress.companyName,
                        country: globalTypes_1.CountryCode[(_5 = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _5 === void 0 ? void 0 : _5.code],
                        countryArea: billingAddress.countryArea,
                        firstName: billingAddress.firstName,
                        lastName: billingAddress.lastName,
                        phone: billingAddress.phone,
                        postalCode: billingAddress.postalCode,
                        streetAddress1: billingAddress.streetAddress1,
                        streetAddress2: billingAddress.streetAddress2,
                    },
                    checkoutId,
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutBillingAddressMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_6 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _6 === void 0 ? void 0 : _6.errors.length) {
                    return {
                        error: (_7 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _7 === void 0 ? void 0 : _7.errors,
                    };
                }
                if ((_8 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _8 === void 0 ? void 0 : _8.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutBillingAddressUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setBillingAddressWithEmail = (billingAddress, email, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _9, _10, _11, _12, _13, _14;
            try {
                const variables = {
                    billingAddress: {
                        city: billingAddress.city,
                        companyName: billingAddress.companyName,
                        country: globalTypes_1.CountryCode[(_9 = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _9 === void 0 ? void 0 : _9.code],
                        countryArea: billingAddress.countryArea,
                        firstName: billingAddress.firstName,
                        lastName: billingAddress.lastName,
                        phone: billingAddress.phone,
                        postalCode: billingAddress.postalCode,
                        streetAddress1: billingAddress.streetAddress1,
                        streetAddress2: billingAddress.streetAddress2,
                    },
                    checkoutId,
                    email,
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutBillingAddressWithEmailMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_10 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _10 === void 0 ? void 0 : _10.errors.length) {
                    return {
                        error: (_11 = data === null || data === void 0 ? void 0 : data.checkoutEmailUpdate) === null || _11 === void 0 ? void 0 : _11.errors,
                    };
                }
                if ((_12 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _12 === void 0 ? void 0 : _12.errors.length) {
                    return {
                        error: (_13 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _13 === void 0 ? void 0 : _13.errors,
                    };
                }
                if ((_14 = data === null || data === void 0 ? void 0 : data.checkoutBillingAddressUpdate) === null || _14 === void 0 ? void 0 : _14.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutBillingAddressUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.setShippingMethod = (shippingMethodId, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _15, _16, _17;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.updateCheckoutShippingMethodMutation,
                    variables: {
                        checkoutId,
                        shippingMethodId,
                    },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_15 = data === null || data === void 0 ? void 0 : data.checkoutShippingMethodUpdate) === null || _15 === void 0 ? void 0 : _15.errors.length) {
                    return {
                        error: (_16 = data === null || data === void 0 ? void 0 : data.checkoutShippingMethodUpdate) === null || _16 === void 0 ? void 0 : _16.errors,
                    };
                }
                if ((_17 = data === null || data === void 0 ? void 0 : data.checkoutShippingMethodUpdate) === null || _17 === void 0 ? void 0 : _17.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutShippingMethodUpdate.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.addPromoCode = (promoCode, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _18, _19, _20;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.addCheckoutPromoCode,
                    variables: { checkoutId, promoCode },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_18 = data === null || data === void 0 ? void 0 : data.checkoutAddPromoCode) === null || _18 === void 0 ? void 0 : _18.errors.length) {
                    return {
                        error: (_19 = data === null || data === void 0 ? void 0 : data.checkoutAddPromoCode) === null || _19 === void 0 ? void 0 : _19.errors,
                    };
                }
                if ((_20 = data === null || data === void 0 ? void 0 : data.checkoutAddPromoCode) === null || _20 === void 0 ? void 0 : _20.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutAddPromoCode.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.removePromoCode = (promoCode, checkoutId) => __awaiter(this, void 0, void 0, function* () {
            var _21, _22, _23;
            try {
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.removeCheckoutPromoCode,
                    variables: { checkoutId, promoCode },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_21 = data === null || data === void 0 ? void 0 : data.checkoutRemovePromoCode) === null || _21 === void 0 ? void 0 : _21.errors.length) {
                    return {
                        error: (_22 = data === null || data === void 0 ? void 0 : data.checkoutRemovePromoCode) === null || _22 === void 0 ? void 0 : _22.errors,
                    };
                }
                if ((_23 = data === null || data === void 0 ? void 0 : data.checkoutRemovePromoCode) === null || _23 === void 0 ? void 0 : _23.checkout) {
                    return {
                        data: this.constructCheckoutModel(data.checkoutRemovePromoCode.checkout),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.createPayment = ({ amount, checkoutId, gateway, token, returnUrl, }) => __awaiter(this, void 0, void 0, function* () {
            var _24, _25, _26;
            try {
                const variables = {
                    checkoutId,
                    paymentInput: {
                        amount,
                        gateway,
                        returnUrl,
                        token,
                    },
                };
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.createCheckoutPaymentMutation,
                    variables,
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_24 = data === null || data === void 0 ? void 0 : data.checkoutPaymentCreate) === null || _24 === void 0 ? void 0 : _24.errors.length) {
                    return {
                        error: (_25 = data === null || data === void 0 ? void 0 : data.checkoutPaymentCreate) === null || _25 === void 0 ? void 0 : _25.errors,
                    };
                }
                if ((_26 = data === null || data === void 0 ? void 0 : data.checkoutPaymentCreate) === null || _26 === void 0 ? void 0 : _26.payment) {
                    return {
                        data: this.constructPaymentModel(data.checkoutPaymentCreate.payment),
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.completeCheckout = ({ checkoutId, paymentData, redirectUrl, storeSource, }) => __awaiter(this, void 0, void 0, function* () {
            var _27, _28;
            try {
                const paymentDataString = paymentData && JSON.stringify(paymentData);
                const { data, errors } = yield this.client.mutate({
                    mutation: CheckoutMutations.completeCheckoutMutation,
                    variables: {
                        checkoutId,
                        paymentData: paymentDataString,
                        redirectUrl,
                        storeSource,
                    },
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    return {
                        error: errors,
                    };
                }
                if ((_27 = data === null || data === void 0 ? void 0 : data.checkoutComplete) === null || _27 === void 0 ? void 0 : _27.errors.length) {
                    return {
                        error: (_28 = data === null || data === void 0 ? void 0 : data.checkoutComplete) === null || _28 === void 0 ? void 0 : _28.errors,
                    };
                }
                if (data === null || data === void 0 ? void 0 : data.checkoutComplete) {
                    return {
                        data: data.checkoutComplete,
                    };
                }
                return {};
            }
            catch (error) {
                return {
                    error,
                };
            }
        });
        this.constructCheckoutModel = ({ id, token, email, shippingAddress, billingAddress, discount, discountName, voucherCode, lines, availablePaymentGateways, availableShippingMethods, shippingMethod, shippingPrice, }) => ({
            availablePaymentGateways,
            availableShippingMethods: availableShippingMethods
                ? availableShippingMethods.filter(utils_1.filterNotEmptyArrayItems)
                : [],
            billingAddress,
            email,
            id,
            lines: lines === null || lines === void 0 ? void 0 : lines.filter(item => (item === null || item === void 0 ? void 0 : item.quantity) && item.variant.id).map(item => {
                const itemVariant = item === null || item === void 0 ? void 0 : item.variant;
                return {
                    id: item.id,
                    quantity: item.quantity,
                    totalPrice: item === null || item === void 0 ? void 0 : item.totalPrice,
                    variant: {
                        attributes: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.attributes,
                        id: itemVariant.id,
                        name: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.name,
                        pricing: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.pricing,
                        product: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.product,
                        quantityAvailable: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.quantityAvailable,
                        sku: itemVariant === null || itemVariant === void 0 ? void 0 : itemVariant.sku,
                    },
                };
            }),
            promoCodeDiscount: {
                discount,
                discountName,
                voucherCode,
            },
            shippingAddress,
            shippingMethod,
            shippingPrice,
            token,
        });
        this.constructPaymentModel = ({ id, gateway, token, creditCard, total, }) => ({
            creditCard,
            gateway,
            id,
            token,
            total,
        });
        this.client = client;
    }
}
exports.ApolloClientManager = ApolloClientManager;
//# sourceMappingURL=index.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleorAPI = void 0;
const data_1 = require("../data");
const ApolloClientManager_1 = require("../data/ApolloClientManager");
const LocalStorageHandler_1 = require("../helpers/LocalStorageHandler");
const jobs_1 = require("../jobs");
const state_1 = require("../state");
const Auth_1 = require("./Auth");
const Cart_1 = require("./Cart");
const Checkout_1 = require("./Checkout");
const collections_1 = require("./collections/collections");
const categories_1 = require("./categories/categories");
const products_1 = require("./products/products");
__exportStar(require("./Checkout"), exports);
__exportStar(require("./Cart"), exports);
class SaleorAPI {
    constructor(client, apiProxy, config, onStateUpdate) {
        this.legacyAPIProxy = apiProxy;
        const localStorageHandler = new LocalStorageHandler_1.LocalStorageHandler();
        const apolloClientManager = new ApolloClientManager_1.ApolloClientManager(client);
        const jobsManager = new jobs_1.JobsManager(localStorageHandler, apolloClientManager);
        const saleorState = new state_1.SaleorState(config, localStorageHandler, apolloClientManager, jobsManager);
        const localStorageManager = new data_1.LocalStorageManager(localStorageHandler, saleorState);
        if (onStateUpdate) {
            saleorState.subscribeToNotifiedChanges(onStateUpdate);
        }
        this.auth = new Auth_1.AuthAPI(saleorState, jobsManager, config);
        this.checkout = new Checkout_1.SaleorCheckoutAPI(saleorState, jobsManager, config);
        this.cart = new Cart_1.SaleorCartAPI(localStorageManager, apolloClientManager, saleorState, jobsManager, config);
        this.categories = new categories_1.CategoriesAPI(client);
        this.collections = new collections_1.CollectionsAPI(client, config);
        this.products = new products_1.ProductsAPI(client, config);
        this.legacyAPIProxy.attachAuthListener(authenticated => {
            if (!authenticated) {
                localStorageHandler.setCheckout({});
                localStorageHandler.setPayment({});
                localStorageHandler.setJobs(null);
            }
        });
    }
}
exports.SaleorAPI = SaleorAPI;
//# sourceMappingURL=index.js.map
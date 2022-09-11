"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSaleorConfig = exports.useSaleorClient = void 0;
const react_1 = __importDefault(require("react"));
const context_1 = require("./context");
function useSaleorClient() {
    const saleor = react_1.default.useContext(context_1.SaleorContext);
    if (!saleor) {
        throw new Error("Could not find saleor's apollo client in the context. " +
            "Did you forget to wrap the root component in a <SaleorProvider>?");
    }
    return saleor.api;
}
exports.useSaleorClient = useSaleorClient;
function useSaleorConfig() {
    const saleor = react_1.default.useContext(context_1.SaleorContext);
    if (!saleor) {
        throw new Error("Could not find saleor's apollo client in the context. " +
            "Did you forget to wrap the root component in a <SaleorProvider>?");
    }
    return saleor.config;
}
exports.useSaleorConfig = useSaleorConfig;
//# sourceMappingURL=helpers.js.map
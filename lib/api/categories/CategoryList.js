"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryList = void 0;
const BaseList_1 = __importDefault(require("../../helpers/BaseList"));
const category_1 = require("../../queries/category");
class CategoryList extends BaseList_1.default {
    constructor() {
        super(...arguments);
        this.getPageInfo = result => { var _a; return (_a = result.data.categories) === null || _a === void 0 ? void 0 : _a.pageInfo; };
        this.getTotalCount = result => { var _a; return (_a = result.data.categories) === null || _a === void 0 ? void 0 : _a.totalCount; };
        this.mapQueryData = data => { var _a; return (_a = data.categories) === null || _a === void 0 ? void 0 : _a.edges.map(({ node }) => node); };
        this.query = (variables) => this.client.query({
            query: category_1.categoryList,
            variables,
        });
    }
}
exports.CategoryList = CategoryList;
//# sourceMappingURL=CategoryList.js.map
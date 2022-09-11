import BaseList, { GetPageInfo, GetTotalCount, MapQueryData } from "../../helpers/BaseList";
import { CategoryList as CategoryListQuery, CategoryListVariables } from "../../queries/gqlTypes/CategoryList";
import { BaseCategory } from "../../fragments/gqlTypes/BaseCategory";
export declare class CategoryList extends BaseList<CategoryListQuery, BaseCategory, CategoryListVariables> {
    getPageInfo: GetPageInfo<CategoryListQuery>;
    getTotalCount: GetTotalCount<CategoryListQuery>;
    mapQueryData: MapQueryData<CategoryListQuery, BaseCategory>;
    query: (variables: CategoryListVariables) => Promise<import("apollo-client").ApolloQueryResult<CategoryListQuery>>;
}

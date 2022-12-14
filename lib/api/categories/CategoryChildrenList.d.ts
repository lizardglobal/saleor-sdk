import BaseList, { GetPageInfo, GetTotalCount, MapQueryData } from "../../helpers/BaseList";
import { CategoryChildrenList as CategoryChildrenListQuery, CategoryChildrenListVariables } from "../../queries/gqlTypes/CategoryChildrenList";
import { BaseCategory } from "../../fragments/gqlTypes/BaseCategory";
export declare class CategoryChildrenList extends BaseList<CategoryChildrenListQuery, BaseCategory, CategoryChildrenListVariables> {
    getPageInfo: GetPageInfo<CategoryChildrenListQuery>;
    getTotalCount: GetTotalCount<CategoryChildrenListQuery>;
    mapQueryData: MapQueryData<CategoryChildrenListQuery, BaseCategory>;
    query: (variables: CategoryChildrenListVariables) => Promise<import("apollo-client").ApolloQueryResult<CategoryChildrenListQuery>>;
}

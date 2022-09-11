import { ApolloQueryResult } from "apollo-client";
import { PageInfo } from "../../fragments/gqlTypes/PageInfo";
export declare type GetBaseListResult<TQuery> = Promise<ApolloQueryResult<TQuery>> | PromiseLike<ApolloQueryResult<TQuery>>;
export declare type GetBaseList<TQuery, TVariables> = (variables: TVariables) => GetBaseListResult<TQuery>;
export declare type MapQueryData<TQuery, TObject> = (data: TQuery) => TObject[] | undefined;
export interface BaseListVariables {
    after?: string | null;
    first: number;
}
export declare type GetPageInfo<TQuery> = (result: ApolloQueryResult<TQuery>) => PageInfo;
export declare type GetTotalCount<TQuery> = (result: ApolloQueryResult<TQuery>) => number;

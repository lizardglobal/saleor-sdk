import React from "react";
import { SaleorAPI } from "../api";
import { ConfigInput } from "../types";
export declare type SaleorContextType = {
    api: SaleorAPI;
    config: ConfigInput;
};
export declare const SaleorContext: React.Context<SaleorContextType | null>;

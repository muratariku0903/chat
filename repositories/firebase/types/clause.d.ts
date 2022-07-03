import { WhereFilterOp, OrderByDirection } from "firebase/firestore";


export type WhereClause = {
    fieldName: string;
    operator: WhereFilterOp;
    fieldValue: any;
}

export type OrderByClause = {
    fieldName: string;
    direValue: OrderByDirection;
};

export type LimitClause = {
    limitCnt: number;
}

export type QueryClauses = {
    whereClauses: WhereClause[];
    orderByClauses: OrderByClause[];
    limitClause: LimitClause | null;
}

import { WhereFilterOp, OrderByDirection, QuerySnapshot } from "firebase/firestore";


export type WhereClause = {
    fieldName: string;
    operator: WhereFilterOp;
    fieldValue: any;
}

export type OrderByClause = {
    fieldName: string;
    direValue: OrderByDirection;
};

export type StartAtClause = {
    prevLastInquiryCreatedAt: number;
};

export type LimitClause = {
    limitCnt: number;
}

export type QueryClauses = {
    whereClauses?: WhereClause[];
    orderByClauses?: OrderByClause[];
    limitClause?: LimitClause | null;
    startAtClause?: StartAtClause | null;
}

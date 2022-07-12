import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { QueryClauses } from "../../../repositories/firebase/types/clause";
import { Inquiry } from "../../../repositories/firebase/types/inquiry";
import { useInquiry } from "../../../hooks/inquiry";
import InquiryTable from "../../base/Inquiry/InquiryTable/InquiryTable";


type OutterProps = {
    inquiries: Inquiry[];
}

const Inquiries: React.FC = () => {
    const inquiries = useSelector((state: RootState) => state.inquiries.inquiries);
    const { fetchInquiries } = useInquiry();

    // whereでマッチするレコードを全て取得してページ分割はtableに任せるか
    useEffect(() => {
        const queryClauses: QueryClauses = {
            whereClauses: [
                {
                    fieldName: 'statusTypeId',
                    operator: 'in',
                    fieldValue: ['K9enOmGKuEPkLwYKoD78', 'i9NH34FZeSEZDW2fNoWw', 'zjTUpxOwRBUCI076GRKE']
                },
                {
                    fieldName: 'staffId',
                    operator: '==',
                    fieldValue: 'rb1ZALaJEpvzPLuH1R27',
                }
            ],
            orderByClauses: [
                {
                    fieldName: 'statusTypeId',
                    direValue: 'asc',
                }
            ],
            limitClause: null,
        }

        fetchInquiries(queryClauses)
            .then(inquiries => {
                console.log(inquiries);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <div>
            <InquiryTable inquiries={inquiries} />
        </div>
    );
}

export default Inquiries;

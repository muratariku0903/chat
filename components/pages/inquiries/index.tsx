import React, { useEffect, useState } from "react";
import { Inquiry } from "../../../repositories/firebase/types/inquiry";
import { QueryClauses } from "../../../repositories/firebase/types/clause";
import { useInquiry } from "../../../hooks/inquiry";
import InquiryTable from "../../base/Inquiry/InquiryTable/InquiryTable";


const Inquiries: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const { fetchInquiries } = useInquiry();

    useEffect(() => {
        const queryClauses: QueryClauses = {
            whereClauses: [
                {
                    fieldName: 'statusTypeId',
                    operator: 'in',
                    fieldValue: ['K9enOmGKuEPkLwYKoD78', 'i9NH34FZeSEZDW2fNoWw']
                }
            ],
            orderByClauses: [
                {
                    fieldName: 'statusTypeId',
                    direValue: 'asc',
                }
            ],
            limitClause: {
                limitCnt: 5
            }
        }

        fetchInquiries(queryClauses)
            .then(res => {
                setInquiries(res);
                console.log(res);
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

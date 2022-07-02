import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardActionArea, CardHeader, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Inquiry } from '../../../../repositories/firebase/types/inquiry';
import { roundStr } from '../../../../utils';



type OutterProps = {
    inquiry: Inquiry;
}

type InquiryCard = OutterProps;

const InquiryCard: React.FC<InquiryCard> = ({ inquiry }) => {
    const [statusTypeId, setStatusTypeId] = useState<Inquiry['statusTypeId']>(inquiry.statusTypeId);

    return (
        <Card>
            <CardHeader title={inquiry.title} />
            <CardContent>
                
            </CardContent>
            <CardActionArea>
                <Button>status update</Button>
            </CardActionArea>
        </Card>
    );
}

export default InquiryCard;

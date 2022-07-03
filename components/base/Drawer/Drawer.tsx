import React, { useState } from 'react';
import { Box, Drawer as DrawerComponent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { QueryClauses } from '../../../repositories/firebase/types/clause';
import { useInquiry } from '../../../hooks/inquiry';
import { drawerWidth } from './constants';


const CheckboxWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center'
});

const SortButton = styled(Button)({
    width: '100%',
})


const Drawer: React.FC = () => {
    const [statusTypeIds, setStatusTypeIds] = useState<string[]>(['K9enOmGKuEPkLwYKoD78', 'i9NH34FZeSEZDW2fNoWw', 'zjTUpxOwRBUCI076GRKE']);
    const { fetchInquiries } = useInquiry();

    const onChangeCheckbox = (statusTypeId: string): void => {
        if (statusTypeIds.includes(statusTypeId)) {
            setStatusTypeIds(statusTypeIds.filter(id => id != statusTypeId));
        } else {
            setStatusTypeIds([...statusTypeIds, statusTypeId]);
        }
    }

    const sort = async () => {
        const queryClauses: QueryClauses = {
            whereClauses: [
                {
                    fieldName: 'statusTypeId',
                    operator: 'in',
                    fieldValue: statusTypeIds,
                },
                // {
                // fieldName: 'staffId',
                // operator: '==',
                // fieldValue: 'rb1ZALaJEpvzPLuH1R27',
                // }
            ],
            orderByClauses: [
                // {
                //     fieldName: 'statusTypeId',
                //     direValue: 'asc',
                // }
            ],
            limitClause: null
        }

        await fetchInquiries(queryClauses);
    }

    return (
        <DrawerComponent
            variant="permanent"
            anchor='right'
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {['untouched', 'working', 'completed'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {(() => {
                                        if (text === 'untouched') {
                                            return (
                                                <CheckboxWrapper>
                                                    <AssignmentLateIcon />
                                                    <Checkbox defaultChecked onChange={() => onChangeCheckbox('i9NH34FZeSEZDW2fNoWw')} />
                                                </CheckboxWrapper>
                                            );
                                        } else if (text === 'working') {
                                            return (
                                                <CheckboxWrapper>
                                                    <AssignmentReturnedIcon />
                                                    <Checkbox defaultChecked onChange={() => onChangeCheckbox('zjTUpxOwRBUCI076GRKE')} />
                                                </CheckboxWrapper>
                                            );
                                        } else if (text === 'completed') {
                                            return (
                                                <CheckboxWrapper>
                                                    <AssignmentTurnedInIcon />
                                                    <Checkbox defaultChecked onChange={() => onChangeCheckbox('K9enOmGKuEPkLwYKoD78')} />
                                                </CheckboxWrapper>
                                            );
                                        }
                                    })()}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <SortButton onClick={sort}>sort</SortButton>
            </Box>
        </DrawerComponent>
    );
}

export default Drawer;

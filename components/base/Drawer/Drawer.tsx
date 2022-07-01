import React from 'react';
import { Box, Drawer as DrawerComponent, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { drawerWidth } from './constants';


const Drawer: React.FC = () => {
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
                                            return <AssignmentLateIcon />;
                                        } else if (text === 'working') {
                                            return <AssignmentReturnedIcon />;
                                        } else if (text === 'completed') {
                                            return <AssignmentTurnedInIcon />;
                                        }
                                    })()}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </DrawerComponent>
    );
}

export default Drawer;

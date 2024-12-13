'use client'
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import userPhoto from '../../../assets/userPhoto.jpg'
import Link from 'next/link';

export default function UserAvatar({ userName }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'avatar-popover' : undefined;

    return (
        <div>
            {/* Avatar */}
            <Avatar
                onClick={handleOpen}
                alt={userName}
                src={userPhoto.src}
                sx={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    bgcolor: '#db4c0a',
                }}
            >
                J
            </Avatar>

            {/* Popover (Portal) */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableScrollLock
                PaperProps={{
                    sx: {
                        ml: '47px',
                        mb: 1
                    },
                }}
            >
                <Box sx={{ p: 2, width: 200 }}>
                    <Typography variant="h6">{userName}</Typography>
                    <Typography variant="body2">{userName + '@gmail.com'}</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Link href="/perfil">
                            <Typography
                                variant="body2"
                                sx={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Ver Perfil
                            </Typography>
                        </Link>
                        <Typography
                            variant="body2"
                            sx={{ cursor: 'pointer', color: 'blue', mt: 1 }}
                            onClick={() => alert('Logout clicado')}
                        >
                            Logout
                        </Typography>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
}

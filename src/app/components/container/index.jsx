import { Box } from "@mui/material";

export function Container() {
    return (
        <Box
            sx={{ width: '400px', height: '400px' }}
        >
            {children}
        </Box>
    );
};
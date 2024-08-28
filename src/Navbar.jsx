import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, position: 'absolute', left: '16px' }}
                    >
                        <DescriptionIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Todos
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

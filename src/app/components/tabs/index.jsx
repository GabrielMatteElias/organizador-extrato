import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export function Abas({ valor, setValor, labels }) {

    const handleChange = (event, newValue) => {
        setValor(newValue);
    };

    return (
        <Box sx={{
            width: '100%',
            backgroundColor: '#fff',
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}
        >
            <Tabs
                value={valor}
                onChange={handleChange}
                aria-label="tabs"
                centered                
            >
                {labels.map((label, index) => (
                    <Tab
                        sx={{
                            '& .MuiTab-root': {
                                color: 'white', // Cor padrão do texto
                            },
                            '& .Mui-selected': {
                                color: 'white', // Cor do texto ao ser selecionado
                            },
                        }}
                        key={index} value={index + 1} label={label} />
                ))}
            </Tabs>
        </Box>
    );
}

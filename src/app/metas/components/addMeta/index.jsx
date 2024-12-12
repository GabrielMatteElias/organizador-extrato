'use client'
import { Box, TextField, Button } from '@mui/material';
import { useState } from "react";

export function AddMeta({ retornaNovaMeta }) {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [dataLimite, setDataLimite] = useState("");

    const formatCurrency = (inputValue) => {
        // Remove qualquer caractere não numérico exceto ponto e vírgula
        const numericValue = inputValue.replace(/[^0-9]/g, "");
        if (!numericValue) return "";

        // Adiciona as casas decimais
        const intValue = parseInt(numericValue, 10) / 100;

        // Formata com separadores de milhar
        return intValue;
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatCurrency(inputValue);
        setValor(formattedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        retornaNovaMeta(nome, valor, dataLimite);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                padding: '2rem 0'
            }}
        >
            <TextField
                label="Nome da Meta"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <TextField
                label="Valor"
                value={valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
                onChange={handleChange}
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Data Limite"
                type="date"
                variant="outlined"
                fullWidth
                value={dataLimite}
                onChange={(e) => setDataLimite(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Salvar
            </Button>
        </Box>
    );
};
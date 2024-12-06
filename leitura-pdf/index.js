const express = require('express');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = 4000;

const cors = require('cors');
app.use(cors());

// Função para processar o arquivo PDF
const processPDF = async () => {
    try {
        const pdfBuffer = fs.readFileSync('./pdf/1.pdf'); // Caminho do arquivo PDF

        const pdfData = await pdfParse(pdfBuffer);
        const lines = pdfData.text.split('\n').map(line => line.trim()).filter(line => line);

        const result = {
            
            transacoes: '', // Agora mandaremos as transações como uma string única
        };

        // Concatenar todas as linhas de transações em uma string única
        const transactionsLines = lines.filter((line, index) => index >= 4); // Ignoramos as principais linhas do cabeçalho
        result.transacoes = transactionsLines.join(' '); // Junta todas as linhas em uma única string

        return result;
    } catch (error) {
        console.error('Erro ao processar o PDF:', error.message || error);
        throw new Error('Erro ao processar o arquivo PDF.');
    }
};

// Endpoint único para retornar os dados
app.get('/extrato', async (req, res) => {
    try {
        const data = await processPDF();
        res.json(data); // Retorna os dados no formato JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
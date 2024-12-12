const express = require('express');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const multer = require('multer');

const app = express();
const PORT = 4000;

const cors = require('cors');
app.use(cors());

const processPDF = async (filePath = './pdf/1.pdf') => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        const pdfBuffer = fs.readFileSync(filePath);

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
const upload = multer({ dest: 'uploads/' }); // Pasta onde os arquivos serão armazenados

app.post('/read-extrato', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path; // Caminho do arquivo recebido pelo multer

        const result = await processPDF(filePath); // Processa o PDF
        res.status(200).json({ sucesso: true, dados: result }); // Envia o resultado
    } catch (error) {
        res.status(500).json({ sucesso: false, mensagem: error.message });
    } finally {
        // Remove o arquivo após o processamento
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Erro ao excluir o arquivo:', err);
            else console.log('Arquivo temporário excluído:', req.file.path);
        });
    }
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
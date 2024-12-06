'use client'
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverIndex, setHoverIndex] = React.useState(null);
  const [hoverIndexSaida, setHoverIndexSaida] = React.useState(null);


  const processTransactions = (transactionString) => {
    const regex = /(PIX|99\*)/g;
    const matches = transactionString.split(regex);

    let transactions = [];
    for (let i = 0; i < matches.length; i++) {
      if (matches[i] === "PIX" || matches[i] === "99*") {
        transactions.push(matches[i] + matches[i + 1]);
        i++;
      }
    }
    return transactions.map((tx) => tx.trim());
  };

  const splitTransactions = (transactions) => {
    const entradas = transactions.filter((tx) =>
      tx.startsWith("PIX recebido")
    );
    const saidas = transactions.filter((tx) =>
      tx.startsWith("PIX enviado")
    );
    return { entradas, saidas };
  };

  function extractTransactionData(data) {
    // Função para extrair o texto antes da primeira data e o primeiro valor
    const headerRegex = /^(.*?)(\d{2}\/\d{2}\/\d{4})/; // Regex para pegar texto antes da primeira data
    const valueRegex = /R\$\s?(\d{1,3}(\.\d{3})*,\d{2})/; // Regex para pegar o valor monetário (R$ 15,00)

    const extractDetails = (transaction) => {
      // Extrai o texto antes da primeira data
      const headerMatch = transaction.match(headerRegex);
      const valueMatch = transaction.match(valueRegex);

      const headerText = headerMatch ? headerMatch[1].trim() : ''; // Parte antes da data
      const firstValue = valueMatch ? valueMatch[1].trim() : '';  // Primeiro valor encontrado

      return { headerText, firstValue };
    };

    const entradasDetails = data.entradas.map((entrada) => extractDetails(entrada));
    const saidasDetails = data.saidas.map((saida) => extractDetails(saida));

    return { entradasDetails, saidasDetails };
  }

  useEffect(() => {
    fetch("http://localhost:4000/extrato")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados do endpoint");
        }
        return response.json();
      })
      .then((data) => {
        const processedTransactions = processTransactions(data.transacoes);
        const { entradas, saidas } = splitTransactions(processedTransactions);

        const processedData = {
          ...data,
          entradas,
          saidas,
        };
        const entradaSaida = extractTransactionData(processedData)
        setData(entradaSaida);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    const inputText = "PIX recebido de GABRIEL SILVA SOUTO01/09/202412∶24R$ 15,00R$ 19,95-";

    // Expressão regular para pegar tudo antes da primeira data
    const headerRegex = /^(.*?)(\d{2}\/\d{2}\/\d{4})/;
    const valueRegex = /R\$\s?(\d{1,3}(\.\d{3})*,\d{2})/;

    // Encontrando o texto antes da primeira data
    const headerMatch = inputText.match(headerRegex);
    const valueMatch = inputText.match(valueRegex);

    const headerText = headerMatch ? headerMatch[1].trim() : ''; // Tudo antes da primeira data
    const firstValue = valueMatch ? valueMatch[1].trim() : '';  // Primeiro valor encontrado

    // Mostrando no console para verificar
    console.log("Texto antes da primeira data:", headerText);
    console.log("Primeiro valor encontrado:", firstValue);

  }, []);
  console.log(data);

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>Erro: {error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Extrato Bancário</h1>

      <div style={styles.header}>
        <p><strong>Período:</strong> 06/12/2023 a 01/09/2024</p>
        <p><strong>Nome:</strong> MARCOS PAULO BIANCHI SANTIAGO</p>
        <p><strong>CPF:</strong> 853.035.690-04</p>
      </div>

      {/* Tabelas lado a lado */}
      <div style={styles.tablesContainer}>
        {/* Entradas */}
        <div style={styles.table}>
          <h2 style={styles.entradasTitle}>Entradas (PIX Recebidos)</h2>
          <ul style={styles.transactionsList}>
            {data.entradasDetails.map((entrada, index) => (
              <li
                key={index}
                style={{
                  ...styles.transactionItem,
                  ...(hoverIndex === index ? styles.transactionItemHover : {}),
                }}
                onMouseEnter={() => setHoverIndex(index)} // Quando o mouse entra
                onMouseLeave={() => setHoverIndex(null)}  // Quando o mouse sai
              >
                <p><strong>{entrada.headerText}</strong></p>
                <p><strong>Valor:</strong> R$ {entrada.firstValue}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Saídas */}
        <div style={styles.table}>
          <h2 style={styles.saidasTitle}>Saídas (PIX Enviados)</h2>
          <ul style={styles.transactionsList}>
            {data.saidasDetails.map((saida, index) => (
              <li
                key={index}
                style={{
                  ...styles.transactionItem,
                  ...(hoverIndexSaida === index ? styles.transactionItemHover : {}),
                }}
                onMouseEnter={() => setHoverIndexSaida(index)} // Quando o mouse entra
                onMouseLeave={() => setHoverIndexSaida(null)}  // Quando o mouse sai
              >
                <p><strong>{saida.headerText}</strong></p>
                <p><strong>Valor:</strong> R$ {saida.firstValue}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS para estilização
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#062d3e", // Fundo escuro
    color: "#c9afa5", // Texto claro
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "26px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#f2f2f2", // Título destacado em tom quente
  },
  header: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #25535b",
    borderRadius: "5px",
    backgroundColor: "#25535b", // Fundo sutil para o cabeçalho
    color: "#f2f2f2", // Texto claro
    display: 'flex',
    justifyContent: 'flex-start',
    alignItens: 'center',
    gap: '35px'
  },
  tablesContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  table: {
    flex: "1",
    maxWidth: "50%",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#25535b", // Fundo sutil para tabelas
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    color: "#c9afa5", // Texto claro
  },
  entradasTitle: {
    fontSize: "18px",
    color: "#4BB543", // Destaque quente para entradas
    textAlign: "center",
    borderBottom: "1px solid #4BB543",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  saidasTitle: {
    fontSize: "18px",
    color: "#fa113d", // Destaque frio para saídas
    textAlign: "center",
    borderBottom: "1px solid #fa113d",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  transactionsList: {
    listStyleType: "none",
    padding: "0",
    fontSize: "14px",
    color: "#c9afa5",
  },
  transactionItem: {
    padding: "1px 8px",
    borderBottom: "1px solid #c9afa5",
    wordWrap: "break-word",
    backgroundColor: "#062d3e", // Fundo leve para itens
    borderRadius: "3px",
    marginBottom: "1px",
    transition: "background-color 0.3s ease, transform 0.2s ease", // Transição suave
    cursor: "pointer", // Cursor de mão para indicar interatividade
  },
  transactionItemHover: {
    backgroundColor: "#25535b", // Fundo ao passar o mouse
    transform: "scale(1.02)", // Leve aumento
  },
};

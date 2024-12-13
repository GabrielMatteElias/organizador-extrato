'use client'
import { useState } from 'react';
import { ModalBasico } from '../components/modal';
import { AddMeta } from './components/addMeta'
import { Card, CardContent, Typography, Box, Grid2, Button, CardActions, LinearProgress, Tooltip } from '@mui/material';
import Image from 'next/image';
import greciaJpg from '../../assets/grecia.jpg'
import whiskyJpg from '../../assets/whisky.jpg'
import bolsoJpg from '../../assets/bolso.jpg'
import carroJpg from '../../assets/carro.jpg'
import cursoJpg from '../../assets/curso.jpg'
import armarioJpg from '../../assets/armario.jpg'
import casaJpg from '../../assets/casa.jpg'
import bicicletaJpg from '../../assets/bicicleta.jpg'
import computadorJpg from '../../assets/computador.jpg'
import padraoJpg from '../../assets/metaPadrao.jpg'


import { formatadorData, formatadorMonetario } from '../../utils/formatadores'
import { RemoveMeta } from './components/removeMeta';
import { UpdateMeta } from './components/updateMeta';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
};

const metas = [
    { nome: 'Perfume bolsonaro', valor: 255.00, valorAlcancado: 230.00, data: '01/12/2024' },
    { nome: 'Viagem de férias', valor: 25000.00, valorAlcancado: 12000.00, data: '15/06/2025' },
    { nome: 'Whisky', valor: 125.00, valorAlcancado: 125.00, data: '10/03/2024' },
    { nome: 'Carro novo', valor: 50000.00, valorAlcancado: 35000.00, data: '01/11/2025' },
    { nome: 'Curso de Design', valor: 3000.00, valorAlcancado: 1500.00, data: '30/04/2024' },
    { nome: 'Armário', valor: 1500.00, valorAlcancado: 800.00, data: '20/09/2024' },
    { nome: 'Casa própria', valor: 200000.00, valorAlcancado: 120000.00, data: '01/01/2026' },
    { nome: 'Computador', valor: 8000.00, valorAlcancado: 8000.00, data: '15/06/2024' },
    { nome: 'Bicicleta elétrica', valor: 4000.00, valorAlcancado: 1500.00, data: '10/08/2024' }
];

export default function Metas() {
    const [modalState, setModalState] = useState({ add: false, remove: false, update: false });
    const [listaMetas, setListaMetas] = useState(metas);
    const [metaChange, setMetaChange] = useState(null);

    const getProgressColor = (progresso) => {
        if (progresso <= 15) {
            return "error";  // Vermelho (até 15%)
        } else if (progresso <= 30) {
            return "warning";  // Amarelo (16% a 30%)
        } else if (progresso <= 50) {
            return "info";  // Azul (31% a 50%)
        } else if (progresso <= 80) {
            return "primary";  // Azul escuro (51% a 80%)
        } else {
            return "success";  // Verde (81% a 100%)
        }
    };

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        {...props}
                        color={getProgressColor(props.value)}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    function handleAdicionaNovaMeta(nome, valor, data) {
        const dataFormatada = formatadorData(data)
        setListaMetas((prevMetas) => [
            ...prevMetas,
            { nome, valor, data: dataFormatada, valorAlcancado: 0 },
        ]);
    }

    function handleUpdateMeta(meta) {
        setMetaChange(meta)
        setModalState({ update: true })
    }

    function returnUpdateMeta(valor, nome) {
        setListaMetas((prevMetas) =>
            prevMetas.map((meta) =>
                meta.nome === nome ? { ...meta, valorAlcancado: valor } : meta
            )
        );
    }

    function handleDeleteMeta(meta) {
        setModalState({ remove: true })
        setMetaChange(meta)
    }

    function handleConfirmDelete() {
        setListaMetas((prevMetas) =>
            prevMetas.filter((meta) => meta.nome !== metaChange)
        );
        setModalState({ remove: false });
        setMetaChange(null)
    };

    function handleCancelDelete() {
        setMetaChange(null)
        setModalState({ remove: false });
    };

    return (
        <Box>
            <ModalBasico
                style={modalStyle}
                modal={modalState.add}
                setModal={() => setModalState({ add: false })}
                titulo="Nova meta"
            >
                <AddMeta retornaNovaMeta={handleAdicionaNovaMeta} />
            </ModalBasico>

            <ModalBasico
                style={modalStyle}
                modal={modalState.update}
                setModal={() => setModalState({ update: false })}
                titulo="Atualizar valor"
            >
                <UpdateMeta meta={metaChange} retornaUpdatedMeta={returnUpdateMeta} />
            </ModalBasico>

            <RemoveMeta open={modalState.remove} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} meta={metaChange} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Box>
                    <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontSize: "36px",
                            marginBottom: "10px",
                            textAlign: "left",
                            color: "#2980B9",
                            fontWeight: 'bold'
                        }}>
                        Metas
                    </Typography>
                    <Typography variant="h4" align="center" gutterBottom
                        sx={{
                            fontSize: "1.8rem",
                            marginBottom: "20px",
                            textAlign: "left",
                            color: "#595959",
                        }}>
                        Planeje, gerencie e atinja suas metas com facilidade.
                    </Typography>
                </Box>
                <Button onClick={() => setModalState({ add: true })} variant="contained" sx={{ height: '3rem' }}>Adicionar meta</Button>
            </Box>

            <Box>
                <Grid2
                    container
                    spacing={3}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    {listaMetas?.map((meta, index) => {
                        // Calcula se o progresso é 100% para essa meta
                        const isCompleted = (meta.valorAlcancado / meta.valor) * 100 === 100;

                        return (
                            <Grid2 xs={12} sm={6} md={4} key={index} >
                                <Card sx={{
                                    position: 'relative', // Necessário para o ícone ficar posicionado sobre a imagem
                                    maxWidth: 345,
                                    boxShadow: 3,
                                    transition: 'transform 0.3s ease-out', // Suaviza a transição
                                    '&:hover': {
                                        transform: 'scale(1.05)', // Ajusta o scale corretamente
                                    },
                                    backgroundColor: isCompleted ? '#d4edda' : 'white', // Cor de fundo diferente para 100%
                                    border: isCompleted ? '2px solid #28a745' : 'none', // Borda verde quando 100%
                                    borderRadius: 2, // Ajuste no arredondamento
                                }}>
                                    <Image
                                        src={
                                            meta.nome.includes("Perfume") ? bolsoJpg :
                                                meta.nome.includes("Viagem") ? greciaJpg :
                                                    meta.nome.includes("Whisky") ? whiskyJpg :
                                                        meta.nome.includes("Bicicleta") ? bicicletaJpg :
                                                            meta.nome.includes("Casa") ? casaJpg :
                                                                meta.nome.includes("Armário") ? armarioJpg :
                                                                    meta.nome.includes("Curso") ? cursoJpg :
                                                                        meta.nome.includes("Carro") ? carroJpg :
                                                                            meta.nome.includes("Computador") ? computadorJpg :
                                                                                padraoJpg
                                        }
                                        alt={meta.nome} // Texto alternativo para acessibilidade
                                        width={345} // Largura da imagem
                                        height={140} // Altura da imagem
                                        style={{ objectFit: 'cover' }} // Para garantir que a imagem seja cortada corretamente
                                    />

                                    {/* Exibe o ícone de CheckCircle se o progresso for 100% */}
                                    {isCompleted && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                borderRadius: '50%',
                                                padding: '0.3rem',
                                            }}
                                        >
                                            <CheckCircleIcon
                                                sx={{
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    color: '#2e7d32',
                                                    cursor: 'default',
                                                    fontSize: '2.3rem'
                                                }}
                                            />
                                        </Box>
                                    )}

                                    <CardContent sx={{ padding: '1rem' }}>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.5rem' }}>
                                            {meta.nome} {/* Nome da meta */}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.3rem' }}>
                                            Valor: R$ {formatadorMonetario(meta.valor)} {/* Valor formatado */}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.3rem' }}>
                                            Data de encerramento: {meta.data} {/* Data da meta */}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1.3rem' }}>
                                            Progresso:
                                        </Typography>
                                        <Tooltip
                                            title={`R$ ${formatadorMonetario(meta.valorAlcancado)} de R$ ${formatadorMonetario(meta.valor)}`}
                                            arrow>
                                            <LinearProgressWithLabel
                                                value={(meta.valorAlcancado / meta.valor) * 100} // Valor entre 0 e 100
                                            />
                                        </Tooltip>
                                    </CardContent>

                                    <CardActions>
                                        <Button size="medium" onClick={() => handleUpdateMeta(meta)}>Atualizar</Button>
                                        <Button size="medium" onClick={() => handleDeleteMeta(meta.nome)}>Remover</Button>
                                    </CardActions>
                                </Card>
                            </Grid2>
                        );
                    })}

                </Grid2>
            </Box>
        </Box >
    )
};
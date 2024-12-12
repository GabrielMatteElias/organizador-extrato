'use client'
import { useState } from 'react';
import { ModalBasico } from '../components/modal';
import { AddMeta } from './components/addMeta'
import { Card, CardContent, Typography, Box, Grid2, Button, CardActions, LinearProgress, Tooltip } from '@mui/material';
import Image from 'next/image';
import greciaJpg from '../../assets/grecia.jpg'
import whiskyJpg from '../../assets/whisky.jpg'
import bolsoJpg from '../../assets/bolso.jpg'
import { formatadorData, formatadorMonetario } from '../../utils/formatadores'
import { RemoveMeta } from './components/removeMeta';

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
    { nome: 'Perfume bolsonaro', valor: 250.00, valorAlcancado: 155.00, data: '01/12/2024' },
    { nome: 'Viagem de férias', valor: 25000.00, valorAlcancado: 23500.00, data: '15/06/2025' },
    { nome: 'Whisky', valor: 125.00, valorAlcancado: 125.00, data: '10/03/2024' },
];

export default function Metas() {
    const [modalState, setModalState] = useState({ add: false, remove: false });
    const [listaMetas, setListaMetas] = useState(metas);
    const [metaToDelete, setMetaToDelete] = useState(null);

    function handleAdicionaNovaMeta(nome, valor, data) {
        const dataFormatada = formatadorData(data)
        setListaMetas((prevMetas) => [
            ...prevMetas,
            { nome, valor, data: dataFormatada, valorAlcancado: 0 },
        ]);
    }

    function handleRemoveMeta(meta) {
        setModalState({ remove: true })
        setMetaToDelete(meta)
    }

    function handleConfirmDelete() {
        console.log("Meta excluída:", metaToDelete);

        setListaMetas((prevMetas) =>
            prevMetas.filter((meta) => meta.nome !== metaToDelete)
        );
    };

    function handleCancelDelete() {
        console.log("Cancelado excluída");

        setModalState({ remove: false });
    };

    return (
        <Box>
            <ModalBasico
                style={modalStyle}
                modal={modalState.add}
                setModal={() => setModalState({ add: true })}
                titulo="Nova meta"
            >
                <AddMeta retornaNovaMeta={handleAdicionaNovaMeta} />
            </ModalBasico>

            <RemoveMeta open={modalState.remove} onClose={handleCancelDelete} onConfirm={handleConfirmDelete} meta={metaToDelete} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                <Button onClick={() => setModalState(true)} variant="contained" sx={{ height: '3rem', marginTop: '1.1rem' }}>Adicionar meta</Button>
            </Box>

            <Box>
                <Grid2
                    container
                    spacing={3}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {listaMetas?.map((meta, index) => (
                        <Grid2 xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                maxWidth: 345,
                                boxShadow: 3,
                                transition: 'transform 0.3s ease-out', // Suaviza a transição
                                '&:hover': {
                                    transform: 'scale(1.1)', // Ajusta o scale corretamente
                                    transition: 'transform 0.3s ease-out', // Suaviza a transição
                                },
                            }}>
                                <Image
                                    src={index === 0 ? bolsoJpg : index === 1 ? greciaJpg : whiskyJpg} // Caminho da imagem
                                    alt={meta.nome} // Texto alternativo para acessibilidade
                                    width={345} // Largura da imagem
                                    height={140} // Altura da imagem
                                    style={{ objectFit: 'cover' }} // Para garantir que a imagem seja cortada corretamente
                                />
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
                                        <LinearProgress
                                            variant="determinate"
                                            value={(meta.valorAlcancado / meta.valor) * 100} // Valor entre 0 e 100
                                            sx={{ height: 7, borderRadius: 3 }}
                                        />
                                    </Tooltip>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium">Editar</Button> {/* Botão para editar a meta */}
                                    <Button size="medium" onClick={() => handleRemoveMeta(meta.nome)}>Remover</Button> {/* Botão para remover a meta */}
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    )
};
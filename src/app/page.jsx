
import Image from 'next/image'
import logoImg from '../assets/letreiroSmartPlan.png'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link';

const styles = {
  image: {
    objectFit: "contain", // Mantém proporções sem cortar
    borderRadius: "10px", // Opcional: bordas arredondadas
  },
};

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
      }}
    >

      <Image
        src={logoImg}
        priority
        width={'auto'}
        height={'auto'}
        layout="intrinsic" // Isso ajusta a imagem ao seu tamanho real
        alt='Logo SmartPlan'
        style={styles.image}
        quality={100}
      />

      <Typography
        variant="h5"
        component="p"
        sx={{
          margin: '-5rem 0 0 17.9rem',
          fontWeight: "bold",
          color: "#595959",
        }}
      >Simplifique suas contas, maximize seu futuro.</Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginTop: 4,
          alignItems: "center",
        }}
      >
        {/* Botão para Extrato */}
        <Link href="/extrato" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '8rem',
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Extrato
          </Button>
        </Link>

        {/* Botão para Metas */}
        <Link href="/metas" passHref>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: '8rem',
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Metas
          </Button>
        </Link>
      </Box>
    </Box>
  )
};
//mui
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//css
import styles from './index.module.css';

export function ModalBasico({ titulo, style, modal, setModal, children }) {
    const handleClose = () => setModal(false);

    return (
        <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {titulo &&
                    <header className={styles.modal_cabecalho}>
                        <h1>
                            {titulo}
                        </h1>
                        <CloseIcon className={styles.modal_close} fontSize='large' onClick={() => setModal(false)} />
                    </header>
                }
                {children}
            </Box>
        </Modal>
    );
};
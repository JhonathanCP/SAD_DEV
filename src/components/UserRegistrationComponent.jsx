import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

export function UserRegistrationComponent({ show, handleClose }) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleAcceptTerms = () => {
        setAcceptedTerms(true);
    };

    const handleDownloadFormat = async () => {
        try {
            // Obtén una URL directa del archivo desde Google Drive
            const fileUrl = 'https://drive.google.com/uc?export=download&id=1fzAcxnMElIo-HiFlnSZKZBclEKeq98Df';

            // Crea un enlace invisible
            const link = document.createElement('a');
            link.href = fileUrl;
            link.rel = 'noopener noreferrer'; // Mejora la seguridad para evitar el "opener" de seguridad
            link.click();
            handleClose()
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
            // Maneja el error según sea necesario
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Términos y Condiciones de Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Embeber el PDF utilizando un iframe */}
                <iframe
                    title="PDF Viewer"
                    width="100%"
                    height="700vh"
                    src="https://drive.google.com/file/d/1otPi8ywiHA-tDE6_h5_NeawB1i2y1KLb/preview"
                ></iframe>
            </Modal.Body>
            <Modal.Footer>
                {!acceptedTerms && (
                    <Button variant="primary" onClick={handleAcceptTerms}>
                        Acepto los términos y condiciones
                    </Button>
                )}
                {acceptedTerms && (
                    <Button variant="success" onClick={handleDownloadFormat}>
                        Descargar formato de acceso
                    </Button>
                )}

            </Modal.Footer>
        </Modal>
    );
}

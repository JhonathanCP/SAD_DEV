import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container } from 'react-bootstrap';

export function UserRegistrationComponent({ show, handleClose }) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleAcceptTerms = () => {
        setAcceptedTerms(true);
    };

    const restartTerms = () => {
        setAcceptedTerms(false);
    };

    const handleDownloadFormat = async () => {
        try {
            // Obtén una URL directa del archivo desde Google Drive
            const fileUrl = 'https://docs.google.com/spreadsheets/d/1Qa8foxxOi5xDO3JpZyOd1IPRTwrDVUGy/export?format=xlsx';
            // Crea un enlace invisible
            //https://docs.google.com/spreadsheets/d/1Qa8foxxOi5xDO3JpZyOd1IPRTwrDVUGy/edit?usp=sharing&ouid=114250103196097162167&rtpof=true&sd=true
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
        <Modal show={show} onHide={() =>{handleClose(); restartTerms();}} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Términos y Condiciones de Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Embeber el PDF utilizando un iframe */}
                <iframe
                    title="PDF Viewer"
                    width="100%"
                    height="550vh"
                    src="https://drive.google.com/file/d/1otPi8ywiHA-tDE6_h5_NeawB1i2y1KLb/preview"
                ></iframe>
            </Modal.Body>
            <Modal.Footer>
                <Container fluid className='px-5'>
                    <p>Instrucciones:</p>
                    <ol>
                        <li>
                            Leer detenidamente los T&C de registro y uso del SAD.
                        </li>
                        <li>
                            Aceptar los T&C, de corresponder.
                        </li>
                        <li>
                            Descarga el formato de acceso y lee las instrucciones del Excel.
                        </li>
                    </ol>
                    <p>Para consultas adicionales escribir a: gctic.gsit06@essalud.gob.pe</p>
                </Container>
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

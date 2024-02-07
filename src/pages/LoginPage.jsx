import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card, Col, Form, FormGroup, FormControl, FormLabel, Button, Container, Image, Modal, FormCheck } from 'react-bootstrap';
import FondoSvg from '../assets/fondo.svg';
import Logo from '../assets/logo-essalud.svg';
import { UserRequestComponent } from '../components/UserRequestComponent'
import { UserRegistrationComponent } from '../components/UserRegistrationComponent'

export function LoginPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false); // Nuevo estado
    const handleShowModal = () => setShowModal(true);
    const handleShowRequestModal = () => setShowRequestModal(true); // Nuevo controlador
    const handleCloseRequestModal = () => setShowRequestModal(false); // Nuevo controlador
    const navigate = useNavigate();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LfJ-TkpAAAAAGk-luwLSzw3ihrxMprK85ckCalL';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup: remove the script when the component unmounts
            document.head.removeChild(script);
        };

    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Use the reCAPTCHA v3 API to verify the user
            const capResponse = await window.grecaptcha.execute('6LfJ-TkpAAAAAGk-luwLSzw3ihrxMprK85ckCalL', {
                action: 'login',
            });

            if (!capResponse) {
                toast.error('Validación reCAPTCHA fallida. Por favor, inténtalo de nuevo.');
                return;
            }

            const response = await login({ ...credentials, recaptchaToken: capResponse });
            const accessToken = response.data.token;
            const expirationTime = jwtDecode(accessToken).exp;
            localStorage.setItem('access', accessToken);
            localStorage.setItem('expirationTime', expirationTime);
            toast.success('Sesión iniciada correctamente.');
            navigate('/menu');
        } catch (error) {
            setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
            console.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.', error);
            toast.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Container
            style={{ background: `url(${FondoSvg})`, minHeight: '100vh', position: 'absolute'}}
            fluid
            className="d-flex align-items-center justify-content-center"
        >
            <Row>
                <Col lg={7} md={6} xs={12} className="d-flex justify-content-center align-items-center p-5">
                    <div className="text-white">
                        <h1 className="d-block d-sm-none text-center">Sistema de Analítica de Datos</h1>
                        <h1 className="d-none d-md-block">Sistema de Analítica de Datos</h1>
                        <p className="d-none d-sm-block">
                            Sistema institucional de EsSalud que pone a disposición los tableros de mando y control desarrollados con
                            business intelligence y business analytics para la toma de decisiones en el marco del gobierno de datos.
                        </p>
                    </div>
                </Col>
                <Col lg={5} md={6} xs={12} className="d-flex flex-column align-items-center">
                    <Card className="p-4" style={{ width: '22.9rem' }}>
                        <Form onSubmit={handleLogin}>
                            <div className="text-center mb-4">
                                <Image src={Logo} alt="Logo" />
                            </div>

                            <FormGroup controlId="username" className="mb-3">
                                <FormLabel>Usuario</FormLabel>
                                <FormControl type="text" name="username" value={credentials.username} onChange={handleChange} />
                            </FormGroup>

                            <FormGroup controlId="password" className="mb-3">
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl type="password" name="password" value={credentials.password} onChange={handleChange} />
                            </FormGroup>
                            <Button variant="primary" type="submit" className="w-100 mt-3">
                                Entrar
                            </Button>
                            {/* <div className="mt-3 text-center">
                                <Button variant="link" className="text-primary" onClick={handleShowRequestModal}>
                                    Solicitar Acceso
                                </Button>
                            </div>
                            <UserRequestComponent show={showRequestModal} handleClose={handleCloseRequestModal} /> */}
                            <div className="mt-3 text-center">
                                <Button variant="link" className="text-primary" onClick={handleShowRequestModal}>
                                    Solicitar Acceso
                                </Button>
                            </div>
                            <UserRegistrationComponent show={showRequestModal} handleClose={handleCloseRequestModal} />
                        </Form>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
}
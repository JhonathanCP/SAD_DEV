// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo-essalud-blanco.svg';
import { toast } from "react-hot-toast";

export function AdminNavBarComponent() {
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const expirationTime = localStorage.getItem('expirationTime');
        if (expirationTime) {
            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

            if (currentTime > expirationTime) {
                toast('Sesión expirada', {
                    icon: '👏',
                });
                // El token ha expirado, cierra sesión
                handleLogout();
            }
        }

        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsuario(decodedToken.username);
        }
    }, []);

    const handleLogout = () => {
        // Lógica para cerrar sesión, por ejemplo, eliminar el token y redirigir al inicio de sesión
        localStorage.removeItem('access');
        localStorage.removeItem('expirationTime');
        // Redirige al inicio de sesión u otra página
        toast.success("Sesión terminada");
        navigate("/login");
    };

    return (
        <Container fluid className='p-0' style={{ minHeight: '2.5vh' }}>
            <Navbar style={{ backgroundColor: "#0064AF", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} data-bs-theme="dark" className='p-0 align-items-center justify-content-center'>
                <Container fluid className='mx-5 px-5 py-1'>

                    <Navbar.Brand className='d-none d-xl-block'>
                        <img
                            src={Logo}
                            style={{ width: "140.5px", height: "29.98px" }}
                            className="d-inline-block align-top img-fluid"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
                        <Nav>
                            <Nav.Link onClick={() => navigate(`/menu`)}>
                                <span><i className={`bi bi-house text-white`}></i></span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link onClick={() => navigate(`/admin/users`)}>
                                <span><i className={`bi bi-send text-white`}></i><span className='d-none d-sm-inline'> Solicitud de reportes</span></span>
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate(`/admin/users`)}>
                                <span><i className={`bi bi-person-lines-fill text-white`}></i><span className='d-none d-sm-inline'> Solicitud de usuarios</span></span>
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate(`/admin/users`)}>
                                <span><i className={`bi bi-people text-white`}></i><span className='d-none d-sm-inline'> Listado de usuarios</span></span>
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate(`/admin/info`)}>
                                <span><i className={`bi bi-bar-chart  text-white`}></i><span className='d-none d-sm-inline'> Listado de grupos y reportes</span></span>
                            </Nav.Link>
                            <NavDropdown title={usuario} id="usuario-dropdown">
                                <NavDropdown.Item className='small' onClick={() => handleLogout()}>
                                    <span><i className={`bi bi-box-arrow-left`}></i></span> Cerrar sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
}

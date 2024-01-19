// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Accordion, Container, Navbar, Nav, NavDropdown, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';
import { getGroups } from '../api/groups.api';
import { getReports } from '../api/reports.api';
import Logo from '../assets/logo-essalud-blanco.svg';

export function InfoComponent() {
    const [groups, setGroups] = useState([]);
    const [reports, setReports] = useState([]);
    const [usuario, setUsuario] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupsResponse = await getGroups();
                const reportsResponse = await getReports();

                setGroups(groupsResponse.data);
                setReports(reportsResponse.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();

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
        <Container fluid className='p-0'>
            <Container fluid className='p-0' style={{ minHeight: '2.5vh' }}>
                <Navbar fixed="true" style={{ backgroundColor: "#0064AF", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} data-bs-theme="dark" className='p-0 align-items-center justify-content-center'>
                    <Container fluid className='mx-5 px-5 py-1'>

                        <Navbar.Brand className='d-none d-xl-block'>
                            <img
                                src={Logo}
                                style={{ width: "140.5px", height: "29.98px" }}
                                className="d-inline-block align-top img-fluid"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav>
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
            <Container fluid className='px-5 py-4'>
                <Row>
                    <Col md={11}>
                        <h2>Listado de Grupos</h2>
                    </Col>
                    <Col md={1}>
                        <Link to={`/admin/editar/grupo/`} className="btn btn-success">
                            Agregar
                        </Link>
                    </Col>
                </Row>
                <Row>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Activo</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <tr key={group.id}>
                                <td>{group.id}</td>
                                <td>{group.nombre}</td>
                                <td>{group.descripcion}</td>
                                <td>{group.activo ? 'Sí' : 'No'}</td>
                                <td>
                                    <Link to={`/admin/editar/grupo/${group.id}`} className="btn btn-primary">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </Row>

                <h2>Listado de Reportes</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Grupo</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.nombre}</td>
                                <td>{report.descripcion}</td>
                                <td>{groups.find((group) => group.id === report.groupId)?.nombre || 'No asignado'}</td>
                                <td>{report.activo ? 'Sí' : 'No'}</td>
                                <td>
                                    <Link to={`/admin/editar/reporte/${report.id}`} className="btn btn-primary">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </Container>
    );
}

import React, { useEffect, useState } from 'react';
import { getInfo } from '../api/groups.api';
import { jwtDecode } from "jwt-decode";
import { Link, NavLink, Route, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../assets/logo-essalud-blanco.svg';
import Img from '../assets/hero-img.svg';
import { Accordion, Container, Navbar, Nav, NavDropdown, Row, Col, Card } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useParams } from 'react-router-dom';

export function DashboardPage() {

    const [iframeSrc, setIframeSrc] = useState('');

    const { id } = useParams();
    const [col2Visible, setCol2Visible] = useState(true);
    const toggleCol2Visibility = () => {
        setCol2Visible(!col2Visible);
    };

    const [grupos, setGrupos] = useState([]);
    const [grupoActivo, setGrupoActivo] = useState({});
    const [reportes, setReportes] = useState([]);
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    const [grupoExpandido, setGrupoExpandido] = useState(null);
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isHovered, setIsHovered] = useState(Array(grupos.length).fill(false));

    const handleMouseEnter = (id) => {
        const newHoverState = [...isHovered];
        newHoverState[id] = true;
        setIsHovered(newHoverState);
    };

    const handleMouseLeave = (id) => {
        const newHoverState = [...isHovered];
        newHoverState[id] = false;
        setIsHovered(newHoverState);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    useEffect(() => {

        const fetchInfo = async () => {
            try {
                const response = await getInfo();
                const activo = response.data.groups.filter(group => group.id == id);
                setGrupoActivo(activo[0].nombre)
                setGrupos(response.data.groups);
                const filteredReportes = response.data.reports.filter(report => report.groupId == id);
                setReportes(filteredReportes);
            } catch (error) {
                console.error('Error al obtener la información:', error);
            }
        };
        fetchInfo();

        AOS.init();
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

    const handleReporte = (nuevoLink) => {
        setIframeSrc(nuevoLink);
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
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
                            <Nav>
                                <Nav.Link onClick={() => navigate(`/menu`)}>
                                    <span><i className={`bi bi-house text-white`}></i></span>
                                </Nav.Link>
                                <NavDropdown title={`${grupoActivo}`} id="reportes-dropdown">

                                    {reportes.map((reporte) => (
                                        <NavDropdown.Item key={reporte.id} className='small' onClick={() => handleReporte(reporte.link)}>
                                            {reporte.nombre}</NavDropdown.Item>
                                    ))}

                                </NavDropdown>
                                {/* <NavDropdown title="Otros Grupos" id="otros-grupos-dropdown">
                                    {grupos.map((grupo) => (
                                        <NavDropdown.Item className='small' onClick={() => { navigate(`/dashboard/${grupo.id}`); window.location.reload(true); }}>
                                            <span><i className={`bi bi-${grupo.icono}`}></i></span> {grupo.nombre}</NavDropdown.Item>
                                    ))}
                                </NavDropdown> */}

                            </Nav>
                        </Navbar.Collapse>
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

            <Container fluid style={{ backgroundColor: "#f0f0f0", minHeight: '92vh' }} className='p-0'>
                {/* <iframe style={{ minHeight: '98vh', width: '100%' }} src={iframeSrc || (reportes.length > 0 && reportes[0].link)} ></iframe> */}
                {iframeSrc ? (
                    <iframe style={{ minHeight: '97.5vh', width: '100%' }} src={iframeSrc}></iframe>
                ) : (
                    <Row style={{ minHeight: '92vh' }} className='d-flex align-items-center justify-content-center py-4 px-5 mx-2' data-aos="fade-up" data-aos-delay="250">
                        {
                            reportes.map((reporte) => (
                                <Col key={reporte.id} xs={12} sm={4} lg={4} style={{ minHeight: '27.235vh' }}>
                                    <Card border="light" className="d-flex flex-column align-items-center justify-content-center px-1 mx-3" onMouseEnter={() => handleMouseEnter(reporte.id)} onMouseLeave={() => handleMouseLeave(reporte.id)} style={{ height: '16rem', position: 'relative', marginBottom: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleReporte(reporte.link)}>
                                        <div className="icon-container mt-3" style={{ position: 'relative', margin: '0 auto', overflow: 'hidden', width: '75px', height: '75px', }} >
                                            <div className="icon" style={{ position: 'relative', width: '120%', height: '120%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                <i className={`bi bi-bar-chart`} style={{ color: 'black', fontSize: '56px', transition: 'ease-in-out 0.3s', zIndex: '2', position: 'absolute', }}></i>
                                                <div style={{ position: 'relative', height: '38%', width: '38%', background: isHovered[reporte.id] ? '#0064AF' : '#eeeeee', borderRadius: '50%', zIndex: '1', top: '-20px', left: '-20px', transition: '0.3s' }} ></div>
                                            </div>
                                        </div>
                                        <Card.Body className="d-flex flex-column align-items-center">
                                            <Card.Title className="card-title" style={{ borderBottom: `2px solid ${isHovered[reporte.id] ? '#0064AF' : '#eeeeee'}`, transition: '0.3s', textAlign: 'center' }} >{reporte.nombre}</Card.Title>
                                            <Card.Text className="text-primary-emphasis text-center pt-1 pb-0 d-none d-sm-block" style={{ fontSize: '14.5px' }}>
                                                {reporte.descripcion}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                )}
            </Container>
            <Container className='py-0' fluid style={{ backgroundColor: "#f0f0f0", minHeight: '3vh' }}>
                <Row className='d-flex align-items-center justify-content-center py-0' >
                    <div className="text-center small">
                        {/* <img src={LogoA} alt="Logo" style={{width: "140.5px", height: "29.98px"}} /> */}
                        <div className="py-1 text-dark">
                            &copy;2024 Copyright <strong><span>GCTIC - ESSALUD</span></strong>. Todos los derechos reservados
                        </div>
                        {/* <div className="pt-1 text-dark">Desarrollado por la GCTIC</div> */}
                    </div>
                </Row>
            </Container>
        </Container>

    );
}

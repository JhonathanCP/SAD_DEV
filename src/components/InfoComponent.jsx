// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Route, useNavigate } from 'react-router-dom';
import { getGroups } from '../api/groups.api';
import { getReports } from '../api/reports.api';
import { AdminNavBarComponent } from '../components/AdminNavBarComponent'

export function InfoComponent() {
    const [groups, setGroups] = useState([]);
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

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
    }, []);


    return (
        <Container fluid className='p-0'>
            <AdminNavBarComponent></AdminNavBarComponent>
            <Container fluid className='px-5 py-4'>
                <Row>
                    <Col md={11}>
                        <h2>Listado de Grupos</h2>
                    </Col>
                    <Col md={1}>
                        <Link to={`/admin/editar/grupo/`} className="btn btn-success">
                            Crear
                        </Link>
                    </Col>
                </Row>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='col-1'>ID</th>
                                <th className='col-5'>Nombre</th>
                                <th className='col-3'>Icono</th>
                                <th className='col-2'>Activo</th>
                                <th className='col-1'>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => (
                                <tr key={group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.nombre}</td>
                                    <td>{group.icono}</td>
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
                </div>
                <Row>
                    <Col md={11}>
                        <h2>Listado de Reportes</h2>
                    </Col>
                    <Col md={1}>
                        <Link to={`/admin/editar/reporte/`} className="btn btn-success">
                            Crear
                        </Link>
                    </Col>
                </Row>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='col-1'>ID</th>
                                <th className='col-5'>Nombre</th>
                                <th className='col-3'>Grupo</th>
                                <th className='col-2'>Activo</th>
                                <th className='col-1'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td>{report.id}</td>
                                    <td>{report.nombre}</td>
                                    <td>{groups.find((group) => group.id === report.groupId)?.nombre || 'No asignado'}</td>
                                    <td>{report.activo ? 'Sí' : 'No'}</td>
                                    <td>
                                        <Link to={`/admin/editar/reporte/${report.id}`} className="btn btn-primary mx-1">
                                            Editar
                                        </Link>
                                        {/* <Link to={`/admin/editar/reporte/${report.id}`} className="btn btn-danger mx-1">
                                        Eliminar
                                    </Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </Container>
    );
}

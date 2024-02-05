// UserList.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getUsers } from '../api/users.api';
import { Link, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminNavBarComponent } from './AdminNavBarComponent';

export function UsersList() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <Container fluid className='p-0'>
            <AdminNavBarComponent></AdminNavBarComponent>
            <Container fluid className='px-5 py-4'>
                <Row>
                    <Col md={10}>
                        <h2>Listado de Usuarios</h2>
                    </Col>
                    <Col md={2}>
                        <Link to={`/admin/editar/user`} className="btn btn-success">
                            Crear Usuario
                        </Link>
                    </Col>
                </Row>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='col-1'>ID</th>
                                <th className='col-3'>Username</th>
                                <th className='col-4'>Correo</th>
                                <th className='col-2'>Permisos</th>
                                {/* <th className='col-2'>Detalle</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.correo}</td>
                                    <td>
                                        <Link to={`/admin/user/${user.id}`} className="btn btn-primary">
                                            Editar Permisos
                                        </Link>
                                    </td>
                                    {/* <td>
                                        <Link to={`/admin/editar/user/${user.id}`} className="btn btn-primary">
                                            Editar Usuario
                                        </Link>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </Container>
    );
};
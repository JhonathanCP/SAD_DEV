// UserList.jsx
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
            <div className="container mt-4">
                <h2>Listado de Usuarios</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.nombres}</td>
                                <td>{user.apellidos}</td>
                                <td>{user.correo}</td>
                                <td>
                                    <Link to={`/admin/user/${user.id}`} className="btn btn-primary">
                                        Editar Permisos
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};
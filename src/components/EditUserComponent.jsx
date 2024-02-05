// EditGroupComponent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUser } from '../api/users.api';
import { Container } from 'react-bootstrap';
import { AdminNavBarComponent } from './AdminNavBarComponent';
import { toast } from "react-hot-toast";

export function EditUserComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        nombres: '',
        apellidos: '',
        activo: true, // Asegúrate de que inicialmente sea booleano
        dni: '',
        correo: '',
        usuario: '',
        // Agrega más campos según sea necesario
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    // Si hay un ID, obtén la información del grupo existente
                    const response = await getUser(id);
                    setUser(response.data);
                } else {
                    // Si no hay un ID, mantén el estado del grupo vacío para crear uno nuevo
                    setUser({
                        nombres: '',
                        apellidos: '',
                        activo: true, // Asegúrate de que inicialmente sea booleano
                        dni: '',
                        correo: '',
                        // Agrega más campos según sea necesario
                    });
                }
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUser({
            ...user,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // Si hay un ID, actualiza el grupo existente
                //await updateGroup(id, group);
            } else {
                await createUser(user);
            }
            toast.success("Usuario Configurado exitosamente");
            navigate('/admin/users');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    // const handleDelete = async () => {
    //     try {
    //         await deleteGroup(id);
    //         toast.success("Grupo Eliminado exitosamente");
    //         navigate('/admin/info');
    //     } catch (error) {
    //         toast.error("Error al eliminar grupo");
    //         navigate('/admin/info');
    //         console.error('Error al eliminar el grupo:', error);
    //     }
    // };

    return (
        <Container fluid className='p-0'>
            <AdminNavBarComponent></AdminNavBarComponent>
            <div className="container mt-4">
                <h2>{id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombres" className="form-label">
                            Nombres:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombres"
                            name="nombres"
                            value={user.nombres}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellidos" className="form-label">
                            Apellidos:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellidos"
                            name="apellidos"
                            value={user.apellidos}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="activo"
                            name="activo"
                            checked={user.activo}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="activo">
                            Activo
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label">
                            Dni:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="dni"
                            name="dni"
                            value={user.dni}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">
                            Correo:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="correo"
                            name="correo"
                            value={user.correo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                        Guardar cambios
                    </button>
                    {/* <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                        // Condición para mostrar el botón solo si hay un ID
                        hidden={!id}
                    >
                        Eliminar
                    </button> */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-secondary"
                        style={{ marginLeft: '10px' }}
                        // Condición para mostrar el botón solo si hay un ID
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </Container>
    );
};
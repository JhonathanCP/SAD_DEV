// EditGroupComponent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroup, updateGroup, deleteGroup, createGroup } from '../api/groups.api';
import { Container } from 'react-bootstrap';
import { AdminNavBarComponent } from './AdminNavBarComponent';
import { toast } from "react-hot-toast";

export function EditGroupComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [group, setGroup] = useState({
        nombre: '',
        descripcion: '',
        activo: false, // Asegúrate de que inicialmente sea booleano
        icono: '',
        // Agrega más campos según sea necesario
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    // Si hay un ID, obtén la información del grupo existente
                    const response = await getGroup(id);
                    setGroup(response.data);
                } else {
                    // Si no hay un ID, mantén el estado del grupo vacío para crear uno nuevo
                    setGroup({
                        nombre: '',
                        descripcion: '',
                        activo: false,
                        icono: '',
                        // Agrega más campos según sea necesario
                    });
                }
            } catch (error) {
                console.error('Error al obtener el grupo:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setGroup({
            ...group,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // Si hay un ID, actualiza el grupo existente
                await updateGroup(id, group);
            } else {
                await createGroup(group);
            }
            toast.success("Grupo Configurado exitosamente");
            navigate('/admin/info');
        } catch (error) {
            console.error('Error al actualizar el grupo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteGroup(id);
            toast.success("Grupo Eliminado exitosamente");
            navigate('/admin/info');
        } catch (error) {
            toast.error("Error al eliminar grupo");
            navigate('/admin/info');
            console.error('Error al eliminar el grupo:', error);
        }
    };

    return (
        <Container fluid className='p-0'>
            <AdminNavBarComponent></AdminNavBarComponent>
            <div className="container mt-4">
                <h2>{id ? 'Editar Grupo' : 'Crear Grupo'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            value={group.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">
                            Descripción:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={group.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="activo"
                            name="activo"
                            checked={group.activo}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="activo">
                            Activo
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="icono" className="form-label">
                            Icono: (Solo introducir nombre del ícono) <a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener noreferrer">Ver íconos</a>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="icono"
                            name="icono"
                            value={group.icono}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                        Guardar cambios
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="btn btn-danger"
                        style={{ marginLeft: '10px' }}
                        // Condición para mostrar el botón solo si hay un ID
                        hidden={!id}
                    >
                        Eliminar
                    </button>
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
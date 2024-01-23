// EditReportComponent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReport, updateReport, deleteReport, createReport } from '../api/reports.api';
import { getGroups } from '../api/groups.api';
import { Container } from 'react-bootstrap';
import { AdminNavBarComponent } from './AdminNavBarComponent';
import { toast } from "react-hot-toast";

export function EditReportComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [report, setReport] = useState({
        nombre: '',
        descripcion: '',
        link: '',
        grupo: {
            id: '',
            nombre: '',
        },
        activo: false,
        // Agrega más campos según sea necesario
    });
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const responseReport = await getReport(id);
                    setReport(responseReport.data);
                } else {
                    // Si no hay un ID, mantén el estado del grupo vacío para crear uno nuevo
                    setReport({
                        nombre: '',
                        descripcion: '',
                        link: '',
                        grupo: {
                            id: '',
                            nombre: '',
                        },
                        activo: false,
                        // Agrega más campos según sea necesario
                    });
                }
                const responseGroups = await getGroups();
                setGroups(responseGroups.data);
            } catch (error) {
                console.error('Error al obtener el reporte:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setReport({
            ...report,
            [e.target.name]: value,
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // Si hay un ID, actualiza el grupo existente
                await updateReport(id, report);
            } else {
                await createReport(report);
            }
            toast.success("Reporte Configurado exitosamente");
            navigate('/admin/info');
        } catch (error) {
            console.error('Error al actualizar el reporte:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReport(id);
            toast.success("Reporte Eliminado exitosamente");
            navigate('/admin/info');
        } catch (error) {
            toast.error("Error al eliminar reporte");
            navigate('/admin/info');
            console.error('Error al eliminar el reporte:', error);
        }
    };

    return (
        <Container fluid className='p-0'>
            <AdminNavBarComponent></AdminNavBarComponent>
            <div className="container mt-4">
            <h2>{id ? 'Editar Reporte' : 'Crear Reporte'}</h2>
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
                            value={report.nombre}
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
                            value={report.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">
                            Link:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="link"
                            name="link"
                            value={report.link}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="activo"
                            name="activo"
                            checked={report.activo}
                            onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="activo">
                            Activo
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grupo" className="form-label">
                            Grupo:
                        </label>
                        <select
                            className="form-control form-select"
                            id="grupo"
                            name="groupId"
                            value={report['groupId']}
                            onChange={handleInputChange}
                        >
                            <option value="">Seleccionar grupo</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Agrega más campos según sea necesario */}
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
                </form>
            </div>
        </Container>
    );
};
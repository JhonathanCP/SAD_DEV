import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, addGroup, addReport, removeGroup, removeReport, addAllPermissions } from '../api/users.api';
import { getGroups } from '../api/groups.api';
import { getReports } from '../api/reports.api';
import { Container } from 'react-bootstrap';
import { AdminNavBarComponent } from './AdminNavBarComponent';
import { toast } from "react-hot-toast";

export function UserPermissionComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const [reports, setReports] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedReport, setSelectedReport] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUser(id);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        const fetchGroupsAndReports = async () => {
            try {
                // Obtener la lista de grupos y reportes al cargar el componente
                const groupsResponse = await getGroups();
                const reportsResponse = await getReports();

                setGroups(groupsResponse.data);
                setReports(reportsResponse.data);
            } catch (error) {
                console.error('Error fetching groups and reports', error);
            }
        };

        fetchUserData();
        fetchGroupsAndReports();
    }, [id]);


    const handleRemoveGroup = async (group) => {
        try {
            await removeGroup(id, group);
            const updatedUser = await getUser(id);
            toast.success('Grupo removido correctamente');
            setUser(updatedUser.data);
        } catch (error) {
            console.error('Error removing group from user', error);
        }
    };


    const handleRemoveReport = async (report) => {
        try {
            await removeReport(id, report);
            const updatedUser = await getUser(id);
            toast.success('Reporte removido correctamente');
            setUser(updatedUser.data);
        } catch (error) {
            console.error('Error removing report from user', error);
        }
    };


    const handleAddReport = async () => {
        try {
            if (!selectedReport) {
                toast.error('Seleccione una opción');
                return;
            }

            await addReport(id, selectedReport);
            const updatedUser = await getUser(id);
            toast.success('Reporte agregado correctamente');
            setUser(updatedUser.data);
        } catch (error) {
            console.error('Error adding report to user', error);
        }
    };

    const handleAddGroup = async () => {
        try {
            if (!selectedGroup) {
                toast.error('Seleccione una opción');
                return;
            }

            await addGroup(id, selectedGroup);
            const updatedUser = await getUser(id);
            toast.success('Grupo agregado correctamente');
            setUser(updatedUser.data);
        } catch (error) {
            console.error('Error adding group to user', error);
        }
    };

    const handleAddAllPermissions = async () => {
        try {
            await addAllPermissions(id);
            const updatedUser = await getUser(id);
            toast.success('Todos los permisos fueron agregados correctamente');
            setUser(updatedUser.data);
        } catch (error) {
            console.error('Error adding all permissions to user', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className='p-0'>
            <AdminNavBarComponent></AdminNavBarComponent>
            <Container fluid className='px-5 py-4'>
                <div className="row">
                    <div className="col-7">
                        <h2>Permisos de: {user.username}</h2>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" onClick={handleAddAllPermissions}>Agregar Todos los Permisos</button>
                    </div>
                    <div className="col-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary"
                            style={{ marginLeft: '10px' }}
                        // Condición para mostrar el botón solo si hay un ID
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Agregar Permiso de Grupo:</label>
                    <div className="row">
                        <div className="col-10">
                            <select className="form-select me-2" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                                <option value="" disabled>
                                    Seleccione un grupo
                                </option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.id}: {group.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={() => handleAddGroup(selectedGroup)}>Agregar Permiso</button>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Agregar Permiso de Reporte:</label>
                    <div className="row">
                        <div className="col-10">
                            <select className="form-select" value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)}>
                                <option value="" disabled>
                                    Seleccione un reporte
                                </option>
                                {reports.map((report) => (
                                    <option key={report.id} value={report.id}>
                                        {report.id}: {report.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={() => handleAddReport(selectedReport)}>Agregar Permiso</button>
                        </div>
                    </div>
                </div>
                <div className="my-5">
                    <h3>Permisos de Grupo:</h3>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <div className="row">
                                    <div className="col-1">
                                        <th>ID</th>
                                    </div>
                                    <div className="col-9">
                                        <th>Nombre</th>
                                    </div>
                                    <div className="col-2">
                                        <th>Acciones</th>
                                    </div>
                                </div>
                            </tr>
                        </thead>
                        <tbody>
                            {user.groups.map((group) => (
                                <tr key={group.id}>
                                    <div className="row">
                                        <div className="col-1">
                                            <td>{group.id}</td>
                                        </div>
                                        <div className="col-9">
                                            <td>{group.nombre}</td>
                                        </div>
                                        <div className="col-2">
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleRemoveGroup(group.id)}>Eliminar Permiso</button>
                                            </td>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="my-5">
                    <h3>Permisos de Reporte:</h3>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <div className="row">
                                    <div className="col-1">
                                        <th>ID</th>
                                    </div>
                                    <div className="col-9">
                                        <th>Nombre</th>
                                    </div>
                                    <div className="col-2">
                                        <th>Acciones</th>
                                    </div>
                                </div>
                            </tr>
                        </thead>
                        <tbody>
                            {user.reports.map((report) => (
                                <tr key={report.id}>
                                    <div className="row">
                                        <div className="col-1">
                                            <td>{report.id}</td>
                                        </div>
                                        <div className="col-9">
                                            <td>{report.nombre}</td>
                                        </div>
                                        <div className="col-2">
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleRemoveReport(report.id)}>Eliminar Permiso</button>
                                            </td>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </Container>
    );
};

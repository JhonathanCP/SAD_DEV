import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generarPDF } from '../utils/generarPDF'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Card, Col, Form, FormGroup, FormControl, FormLabel, Button, Container, Image, Modal, FormCheck, FormSelect } from 'react-bootstrap';
import { getGroups } from '../api/groups.api';
import { getReports } from '../api/reports.api'

export function UserRequestComponent({ show, handleClose }) {

    const handleCloseModal = () => setShowModal(false);
    const [groups, setGroups] = useState([]);
    const [reports, setReports] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [camposCompletos, setCamposCompletos] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [datos, setDatos] = useState({
        dni: '',
        nombreCompleto: '',
        cargoSolicitante: '',
        correoInstitucional: '',
        celular: '',
        nombreJefeInmediato: '',
        cargoJefeInmediato: '',
        moduloSolicitado: [],
        reportesSolicitados: [],
        regimenLaboral: [],
        sustentoPedido: '',
    });
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

    const handleChangeForm = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // Manejar cambios en campos checkbox
            if (name === 'moduloSolicitado') {
                // Obtener el nombre del grupo en lugar del id
                const selectedGroupName = groups.find((group) => group.id === parseInt(value, 10))?.nombre;

                setDatos({
                    ...datos,
                    [name]: checked ? [...datos[name], selectedGroupName] : datos[name].filter((item) => item !== selectedGroupName),
                });
            } else {
                // Otros campos checkbox (puedes mantener el manejo actual si es necesario)
                setDatos({
                    ...datos,
                    [name]: checked ? [...datos[name], value] : datos[name].filter((item) => item !== value),
                });
            }
        } else {
            // Manejar cambios en otros campos
            setDatos({ ...datos, [name]: value });
        }

        // Verificar campos obligatorios
        const obligatoriosCompletos = (
            datos.dni !== '' &&
            datos.nombre !== '' &&
            datos.apellido !== '' &&
            datos.cargoSolicitante !== '' &&
            datos.correoInstitucional !== '' &&
            datos.celular !== '' &&
            datos.nombreJefeInmediato !== '' &&
            datos.cargoJefeInmediato !== '' &&
            datos.moduloSolicitado.length > 0 && // Al menos un módulo seleccionado
            datos.reportesSolicitados.length > 0 && // Al menos un reporte seleccionado
            datos.regimenLaboral !== '' && // Régimen laboral seleccionado
            datos.sustentoPedido !== ''
        );

        setCamposCompletos(obligatoriosCompletos);
    };

    const handleChangeGroups = (e) => {
        const { value, checked } = e.target;
        const groupId = parseInt(value, 10); // Convertir a número

        if (checked) {
            // Agregar el grupo seleccionado
            setSelectedGroups([...selectedGroups, groupId]);
        } else {
            // Eliminar el grupo no seleccionado
            setSelectedGroups(selectedGroups.filter((group) => group !== groupId));
        }
    };

    const filteredReports = reports.filter((report) => {
        return selectedGroups.some((selectedGroups) => report.groupId == selectedGroups);
    });

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Solicitar Acceso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='pt-1'>
                        <Col md={4}>
                            <Form.Group controlId="formDni">
                                <Form.Label>DNI del solicitante: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dni"
                                    value={datos.dni}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa tu DNI"
                                />
                            </Form.Group>

                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombres del solicitante: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={datos.nombre}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa tus nombres"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formApellido">
                                <Form.Label>Apellidos del solicitante: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellido"
                                    value={datos.apellido}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa tus apellidos"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='pt-1'>
                        <Col md={6}>
                            <Form.Group controlId="formCargoSolicitante">
                                <Form.Label>Cargo del solicitante: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cargoSolicitante"
                                    value={datos.cargoSolicitante}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa tu cargo"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCorreoInstitucional">
                                <Form.Label>Correo institucional: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="correoInstitucional"
                                    value={datos.correoInstitucional}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa tu correo institucional"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='pt-1'>
                        <Col md={12}>
                            <Form.Group controlId="formCelular">
                                <Form.Label>Celular: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="celular"
                                    value={datos.celular}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa tu número de celular"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='pt-1'>
                        <Col md={6}>
                            <Form.Group controlId="formNombreJefeInmediato">
                                <Form.Label>Nombre del jefe inmediato: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombreJefeInmediato"
                                    value={datos.nombreJefeInmediato}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa el nombre de tu jefe inmediato"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCargoJefeInmediato">
                                <Form.Label>Cargo del jefe inmediato: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cargoJefeInmediato"
                                    value={datos.cargoJefeInmediato}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa el cargo de tu jefe inmediato"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='pt-1'>
                        <Col md={4}>
                            <Form.Group controlId="formModuloSolicitado">
                                <Form.Label>Módulo solicitado: {/* Obligatorio */}</Form.Label>
                                <FormGroup>
                                    {groups.map((group) => (
                                        <FormCheck
                                            key={group.id}
                                            type="checkbox"
                                            label={`${group.nombre}`}
                                            name="moduloSolicitado"
                                            value={group.id}
                                            onChange={(e) => {
                                                handleChangeForm(e);
                                                handleChangeGroups(e);
                                            }}
                                        />
                                    ))}
                                </FormGroup>
                            </Form.Group>
                        </Col>
                        <Col md={5}>
                            <Form.Group controlId="formReportesSolicitados">
                                <Form.Label>Reportes solicitados: {/* Obligatorio */}</Form.Label>
                                <FormGroup>
                                    {filteredReports.map((report) => (
                                        <FormCheck
                                            type="checkbox"
                                            label={report.nombre}
                                            name="reportesSolicitados"
                                            value={report.nombre}
                                            onChange={handleChangeForm}
                                        />
                                    ))}
                                </FormGroup>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formRegimenLaboral">
                                <Form.Label>Régimen laboral: {/* Obligatorio */}</Form.Label>
                                <FormSelect
                                    name="regimenLaboral"
                                    value={datos.regimenLaboral}
                                    onChange={handleChangeForm}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="D.L. 276">D.L. 276</option>
                                    <option value="D.L. 728">D.L. 728</option>
                                    <option value="CAS">CAS</option>
                                    <option value="Externo">Externo</option>
                                    {/* Agregar más opciones según sea necesario */}
                                </FormSelect>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='pt-1'>
                        <Col md={12}>
                            <Form.Group controlId="formSustentoPedido">
                                <Form.Label>Sustento del pedido: {/* Obligatorio */}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="sustentoPedido"
                                    value={datos.sustentoPedido}
                                    onChange={handleChangeForm}
                                    placeholder="Ingresa el sustento de tu pedido"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => generarPDF(datos)}
                    disabled={!camposCompletos} // Deshabilita el botón si los campos no están completos
                >
                    Generar y Descargar PDF
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
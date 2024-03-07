import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';
import Select from 'react-select';
import Swal from 'sweetalert2'


export const Mantenimientos = () => {
    const [modal, setModal] = useState(false);
    const [mantenimientos, setMantenimientos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [Maquina, setMaquina] = useState([]);

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [maquinaId, setMaquinaId] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [errors, setErrors] = useState([]);

    const toggle = () => setModal(!modal);


    const handelMaquina = (e) => {
        setMaquinaId(e.value);
    };
    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    };
    const handleFecha = (e) => setFecha(e.target.value);

    const handleHora = (e) => {
        setHora(e.target.value);
    };
    const handleTipo = (e) => {
        setTipo(e.target.value);
    };
    const handleUsuarioId = (e) => {
        setUsuarioId(e.value);
    };


    useEffect(() => {
        listarMantenimiento();
        listarUsuarios();
        listarMaquinas();
    }, []);

    const columns = [
        "fecha_mantenimiento",
        "hora_mantenimiento",
        "descripcion",
        "tipo_mantenimiento",
        "nombre_maquina",
        "nombre_usuario",
        {
          name: "acciones",
          label: "Acciones",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => (
              <div>
                <Button color="primary" onClick={() => handleActualizar(tableMeta.rowIndex)}>
                  Actualizar
                </Button>
                <Button color="danger" onClick={() => handleEliminar(tableMeta.rowIndex)}>
                  Eliminar
                </Button>
              </div>
            ),
          },
        },
      ];
      
    const options = {
        filterType: 'checkbox',
    };

    const optionSelect = usuarios.map(item => ({
        value: item.id_usuario,
        label: item.nombres
    }));

    const selectMaquinas = Maquina.map(item => ({
        value: item.id_maquina,
        label: item.nombre_maquina
    }));

    const listarMantenimiento = () => {
        api.get('Mantenimiento/listar')
            .then(res => {
                setMantenimientos(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const listarUsuarios = () => {
        api.get('usuario/listar')
            .then(res => {
                setUsuarios(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    const listarMaquinas = () => {
        api.get('Maquina/listar')
            .then(res => {
                setMaquina(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const registrar = () => {
        const data = {
            fecha_mantenimiento: fecha,
            hora_mantenimiento: hora,
            descripcion: descripcion,
            tipo_mantenimiento: tipo,
            id_maquina: maquinaId,
            id_usuario: usuarioId
        }

        api.post('mantenimiento/registrar', data)
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {

                    Swal.fire({
                        title: "Correcto!",
                        text: "Se registró correctamente!",
                        icon: "success"
                    });

                    listarMantenimiento();
                    setModal(false)
                    setErrors([])
                }
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (
        <>
            <link rel="stylesheet" href="/public/css/global.css" />
            <link rel="stylesheet" href="/public/css/Mantenimientos.css" />
            <div>
                <MUIDataTable
                    title={""}
                    data={mantenimientos}
                    columns={columns}
                    options={options}
                />
            </div>

            <Button onClick={toggle} className="nuevo-boton">
                Registrar
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <Label>Fecha de Mantenimiento</Label>
                            <Input type="date" onChange={handleFecha} />
                            {errors.find(error => error.path === 'fecha_mantenimiento') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'fecha_mantenimiento').msg}</div>
                            }
                        </Col>

                        <Col md={6}>
                            <Label>Hora de Mantenimiento</Label>
                            <Input type="time" onChange={handleHora} />
                            {errors.find(error => error.path === 'hora_mantenimiento') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'hora_mantenimiento').msg}</div>
                            }
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            <Label>Descripción</Label>
                            <Input type="textarea" onChange={handleDescripcion} />
                            {errors.find(error => error.path === 'descripcion') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'descripcion').msg}</div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>Tipo de Mantenimiento</Label>
                            <Input type="select" onChange={handleTipo}>
                                <option value="">Seleccione...</option>
                                <option value="preventivo">Preventivo</option>
                                <option value="correctivo">Correctivo</option>
                            </Input>
                            {errors.find(error => error.path === 'tipo_mantenimiento') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'tipo_mantenimiento').msg}</div>
                            }
                        </Col>
                        <Col md={6}>
                            <Label>ID de Máquina</Label>
                            <Select
                                id="estado"
                                options={selectMaquinas}
                                placeholder="Seleccione..."
                                onChange={handelMaquina}
                            />
                            {errors.find(error => error.path === 'id_maquina') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'id_maquina').msg}</div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>ID de Usuario</Label>
                            <Select
                                id="estado"
                                options={optionSelect}
                                placeholder="Seleccione..."

                                onChange={handleUsuarioId}
                            />
                            {errors.find(error => error.path === 'id_usuario') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'id_usuario').msg}</div>
                            }
                        </Col>

                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={registrar}>
                        Registrar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

        </>
    );
}
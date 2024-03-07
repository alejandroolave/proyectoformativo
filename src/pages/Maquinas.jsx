import React, { useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import api from "../components/api";
import Select from 'react-select';
import Swal from 'sweetalert2'


export const Maquinas = () => {
    const [modal, setModal] = useState(false);
    const [Maquina, setMaquina] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [Ambiente, setAmbientes] = useState([]);
    const [areas, setAreas] = useState([]);
    const formRef = useRef(null);
    const [errors, setErrors] = useState([]);


    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [placa, setPlaca] = useState("");
    const [modelo, setModelo] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [manual, setManual] = useState("");
    const [serial, setSerial] = useState("");
    const [imagen, setImagen] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [area, setArea] = useState("");
    const [ambiente, setAmbiente] = useState("");


    const handleNombre = (e) => {
        setNombre(e.target.value);
    };

    const handleMarca = (e) => {
        setMarca(e.target.value);
    };

    const handlePlaca = (e) => {
        setPlaca(e.target.value);
    };

    const handleModelo = (e) => {
        setModelo(e.target.value);
    };

    const handleCantidad = (e) => {
        setCantidad(e.target.value);
    };

    const handleManual = (e) => {
        setManual(e.target.files[0]);
    };
    const handleImage = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSerial = (e) => {
        setSerial(e.target.value);
    };

    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const handleUsuarioId = (e) => {
        setUsuarioId(e.value);
    };
    const handleArea = e => {
        setArea(e.value);
    };
    const handleAmbiente = e => {
        setAmbiente(e.value);
    };

    useEffect(() => {
        listarMaquinas();
        listarUsuarios();
        listarAreas();
        listarAmbiente();
    }, []);

    const columns = [
        "nombre_maquina",
        "marca",
        "placa",
        "modelo",
        "cantidad",
        "manual",
        "serial",
        "imagen",
        "descripcion",
        "estado_maquina",
        "nombre_usuario",
        "nombre_area",
        "nombre_ambiente",
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
    const selectAreas = areas.map(item => ({
        value: item.id_area,
        label: item.nombre
    }));


    const selectAmbiente = Ambiente.map(item => ({
        value: item.id_ambiente,
        label: item.nombre
    }));



    const listarMaquinas = () => {
        api.get('Maquina/listar')
            .then(res => {
                setMaquina(res.data);
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
    const listarAreas = () => {
        api.get('area/listar')
            .then(res => {
                setAreas(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    const listarAmbiente = () => {
        api.get('ambiente/listar')
            .then(res => {
                setAmbientes(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };



    const registrar = () => {

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('marca', marca);
        formData.append('placa', placa);
        formData.append('modelo', modelo);
        formData.append('cantidad', cantidad);
        formData.append('serial', serial);
        formData.append('descripcion', descripcion);
        formData.append('id_usuario', usuarioId);
        formData.append('id_area', area);
        formData.append('id_ambiente', ambiente);

        if (imagen !== "") {
            formData.append('img', imagen);
        }
        if (manual !== "") {
            formData.append('manual', manual);
        }

        // return
        api.post('maquina/registrar', formData)
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else if (res.data.status != false) {

                    Swal.fire({
                        title: "Correcto!",
                        text: "Se registró correctamente!",
                        icon: "success"
                    });

                    listarMaquinas();
                    setModal(false)
                    setErrors([])
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Intente nuevamente!",
                        icon: "error"
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }


    const toggle = () => {
        setModal(!modal);
    }

    return (
        <>
            <link rel="stylesheet" href="/public/css/global.css" /><br />
            <link rel="stylesheet" href="/public/css/maquinas.css" /><br />
            <div>
                <MUIDataTable
                    title={"maquinas"}
                    data={Maquina}
                    columns={columns}
                    options={options}
                />
            </div>
            <Button onClick={toggle} className="nuevo-boton">
                Registrar
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar Maquina</ModalHeader>
                <ModalBody>
                    <form className="formulario-maquina">
                        <Row>
                            <Col md={6}>

                                <Label for="nombre">Nombre</Label>
                                <Input type="text" name="nombre" id="nombre" onChange={handleNombre} />
                                {errors.find(error => error.path === 'nombre') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'nombre').msg}</div>
                                }
                            </Col>
                            <Col md={6}>

                                <Label for="marca">Marca</Label>
                                <Input type="text" name="marca" id="marca" onChange={handleMarca} />
                                {errors.find(error => error.path === 'marca') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'marca').msg}</div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>

                                <Label for="placa">Placa</Label>
                                <Input type="text" name="placa" id="placa" onChange={handlePlaca} />
                                {errors.find(error => error.path === 'placa') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'placa').msg}</div>
                                }
                            </Col>
                            <Col md={6}>

                                <Label for="modelo">Modelo</Label>
                                <Input type="text" name="modelo" id="modelo" onChange={handleModelo} />
                                {errors.find(error => error.path === 'modelo') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'modelo').msg}</div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>

                                <Label for="cantidad">Cantidad</Label>
                                <Input type="number" name="cantidad" id="cantidad" onChange={handleCantidad} />
                                {errors.find(error => error.path === 'cantidad') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'cantidad').msg}</div>
                                }
                            </Col>
                            <Col md={6}>

                                <Label for="manual">Manual</Label>
                                <Input type="file" name="manual" id="manual" onChange={handleManual} />
                                {errors.find(error => error.path === 'file') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'file').msg}</div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>

                                <Label for="serial">Serial</Label>
                                <Input type="text" name="serial" id="serial" onChange={handleSerial} />
                                {errors.find(error => error.path === 'serial') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'serial').msg}</div>
                                }
                            </Col>
                            <Col md={6}>

                                <Label for="imagen">Imagen</Label>
                                <Input type="file" name="imagen" id="imagen" onChange={handleImage} />
                                {errors.find(error => error.path === 'file') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'file').msg}</div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>

                                <Label for="descripcion">Descripcion</Label>
                                <Input type="textarea" name="descripcion" id="descripcion" onChange={handleDescripcion} />
                                {errors.find(error => error.path === 'descripcion') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'descripcion').msg}</div>
                                }
                            </Col>
                            <Col md={6}>

                                <Label for="id_usuario">ID Usuario</Label>
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
                        <Row>

                            <Col md={6}>

                                <Label for="id_area">ID Área</Label>
                                <Select
                                    id="estado"
                                    options={selectAreas}
                                    placeholder="Seleccione..."
                                    onChange={handleArea}
                                />
                                {errors.find(error => error.path === 'id_area') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'id_area').msg}</div>
                                }

                            </Col>
                            <Col md={6}>

                                <Label for="id_ambiente">ID Ambiente</Label>
                                <Select
                                    id="estado"
                                    options={selectAmbiente}
                                    placeholder="Seleccione..."
                                    onChange={handleAmbiente}
                                />
                                {errors.find(error => error.path === 'id_ambiente') &&
                                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'id_ambiente').msg}</div>
                                }
                            </Col>
                        </Row >

                    </form >

                </ModalBody >
                <ModalFooter>
                    <Button color="primary" onClick={registrar}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal >
        </>
    );
}

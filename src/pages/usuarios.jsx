import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';

export const Usuarios = () => {
    const [modal, setModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState(""); // Agregado

    const toggle = () => setModal(!modal);

    const handleNames = (e) => setNombres(e.target.value);
    const handleApellidos = (e) => setApellidos(e.target.value); // Agregado

    useEffect(() => {
        listarUsuarios();
    }, []);

    const columns = [
        "id_usuario",
        "identificacion",
        "nombres",
        "apellidos",
        "telefono",
        "correo",
        "estado",
        "contraseña",
        "rol"
    ];

    const options = {
        filterType: 'checkbox',
    };

    const listarUsuarios = () => {
        api.get('usuario/listar')
            .then(res => {
                setUsuarios(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const guardarUsuario = () => {
        api.post('usuario/registrar', {
            nombres: nombres,
            apellidos: apellidos // Agregado
        }).then(res => {
            if (res.data.status === 200) {
                // REGISTRO EXITOSO
                console.log('Registro exitoso');
            } else {
                // NO SE PUDO REGISTRAR
                console.log('No se pudo registrar');
            }
        }).catch(err => {
            console.error(err.response);
        });
    }

    return (
        <>
            <link rel="stylesheet" href="/public/css/usuarios.css" /><br />
            <div>
                <MUIDataTable
                    title={""}
                    data={usuarios}
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
                            <Label>Identificación</Label>
                            <Input onChange={handleNames} />
                        </Col>
                        <Col md={6}>
                            <Label>Nombres</Label>
                            <Input />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>Apellidos</Label>
                            <Input onChange={handleApellidos} />
                        </Col>
                        <Col md={6}>
                            <Label>Teléfono</Label>
                            <Input />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>Correo</Label>
                            <Input />
                        </Col>
                        <Col md={6}>
                            <Label>Estado</Label>
                            <Input type="select">
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>Contraseña</Label>
                            <Input type="password" />
                        </Col>
                        <Col md={6}>
                            <Label>Rol</Label>
                            <Input type="select">
                                <option value="administrador">Administrador</option>
                                <option value="usuario">Usuario</option>
                                <option value="tecnico">Técnicooo</option>
                            </Input>
                        </Col>
                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={guardarUsuario}>
                        Registrar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

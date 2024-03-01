import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios'
import api from "../components/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';

export const Usuarios = () => {
    const [modal, setModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    const [nombres, setNombres] = useState(false);


    const toggle = () => setModal(!modal);
    


    const handleNames = (e) => setNombres(e.target.value)

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

    const options =
    {
        filterType:
            'checkbox',
    };

    const listarUsuarios = () => {
        api.get('usuario/listar')
            .then(res => {
                setUsuarios(res.data)
            })
            .catch(err => {
                console.error(err);
            });
    }

    const guardarUsuario = () => {
        api.post('usuario/registrar', {
            nombres: nombres,

        }).then(res => {
            if(res.data.status == 200) {
                // REGISTRO EXITOSO
            } else {
                // NO SE PUDO REGISTRAR
            }
        }).catch(err => {
            console.error(err.response);
        });
    }

    return (
        <>
            <link rel="stylesheet" href="/public/css/usuarios.css" /><br />
            <div>

                <h1>Tabla
                    para el reporte</h1>

                <MUIDataTable

                    title={"Reporte en React"}

                    data={usuarios}

                    columns={columns}

                    options={options}
                />
                <Button onClick={toggle} className="nuevo-boton">
                    Registrar
                </Button>

            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar</ModalHeader>
                <ModalBody>
                <Row>
                    <Col>
                        <Label>Nombres</Label>
                        <Input onChange={handleNames}/>
                    </Col>
                    <Col>
                        <Label>Apellidos</Label>
                        <Input/>
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
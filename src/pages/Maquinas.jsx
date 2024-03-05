import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import api from "../components/api";

export const Maquinas = () => {
    const [modal, setModal] = useState(false);
    const [Maquina, setMaquina] = useState([]);

    useEffect(() => {
        listarMaquinas();
    }, []);

    const columns = [
        "nombre",
        "marca",
        "placa",
        "modelo",
        "cantidad",
        "manual",
        "serial",
        "imagen",
        "descripcion",
        "estado",
        "id_usuario",
        "id_area",
        "id_ambiente"
    ];

    const options = {
        filterType: 'checkbox',
    };

    const listarMaquinas = () => {
        api.get('Maquina/listar')
            .then(res => {
                setMaquina(res.data);
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
                    {/* Contenido del modal */}
                    <FormGroup>
                        <Label for="nombre">Nombre</Label>
                        <Input type="text" name="nombre" id="nombre" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="marca">Marca</Label>
                        <Input type="text" name="marca" id="marca" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="placa">Placa</Label>
                        <Input type="text" name="placa" id="placa" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="modelo">Modelo</Label>
                        <Input type="text" name="modelo" id="modelo" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cantidad">Cantidad</Label>
                        <Input type="number" name="cantidad" id="cantidad" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="manual">Manual</Label>
                        <Input type="text" name="manual" id="manual" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="serial">Serial</Label>
                        <Input type="text" name="serial" id="serial" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="imagen">Imagen</Label>
                        <Input type="file" name="imagen" id="imagen" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descripcion">Descripcion</Label>
                        <Input type="textarea" name="descripcion" id="descripcion" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="estado">Estado</Label>
                        <Input type="select" name="estado" id="estado">
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="id_usuario">ID Usuario</Label>
                        <Input type="text" name="id_usuario" id="id_usuario" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="id_area">ID Área</Label>
                        <Input type="text" name="id_area" id="id_area" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="id_ambiente">ID Ambiente</Label>
                        <Input type="text" name="id_ambiente" id="id_ambiente" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

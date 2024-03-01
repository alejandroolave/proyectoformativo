import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';

export const Mantenimientos = () => {
    const [modal, setModal] = useState(false);
    const [mantenimientos, setMantenimientos] = useState([]);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        listarMantenimiento();
    }, []);

    const columns = [
        "fecha_mantenimiento",
        "hora_mantenimiento",
        "descripcion",
        "tipo_mantenimiento",
        "id_maquina",
        "id_usuario",
        "id_mantenimiento"
    ];

    const options = {
        filterType: 'checkbox',
    };

    const listarMantenimiento = () => {
        api.get('Mantenimiento/listar')
            .then(res => {
                setMantenimientos(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleNames = (e) => {
        // Aquí puedes manejar el cambio de nombres si es necesario
    }

    const guardarUsuario = () => {
        // Agrega la lógica para guardar el usuario
    }

    return (
        <>
            <link rel="stylesheet" href="/public/css/Mantenimientos.css" /><br />
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
                <Input type="date" />
            </Col>
            <Col md={6}>
                <Label>Hora de Mantenimiento</Label>
                <Input type="time" />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Label>Descripción</Label>
                <Input type="textarea" />
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <Label>Tipo de Mantenimiento</Label>
                <Input type="select">
                    <option value="preventivo">Preventivo</option>
                    <option value="correctivo">Correctivo</option>
                </Input>
            </Col>
            <Col md={6}>
                <Label>ID de Máquin</Label>
                <Input />
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <Label>ID de Usuario</Label>
                <Input />
            </Col>
            <Col md={6}>
                <Label>ID de Mantenimiento</Label>
                <Input />
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
    );
}

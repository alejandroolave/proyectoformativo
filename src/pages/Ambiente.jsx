import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import api from "../components/api";

export const Ambiente = () => {
    const [modal, setModal] = useState(false);
    const [Ambiente, setAmbiente] = useState([]);

    useEffect(() => {
        listarAmbiente();
    }, []);

    const columns = ["id_ambiente", "nombre"];

    const options = {
        filterType: 'checkbox',
    };

    const toggle = () => {
        setModal(!modal);
    };

    const listarAmbiente = () => {
        api.get('Ambiente/listar')
            .then(res => {
                setAmbiente(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <link rel="stylesheet" href="/public/css/maquinas.css" /><br />
            <div>
                <MUIDataTable
                    title={"Ambiente"}
                    data={Ambiente}
                    columns={columns}
                    options={options}
                />
            </div>
            <Button onClick={toggle} className="nuevo-boton">
                Registrar
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar Ambiente</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="idAmbiente">ID Ambiente:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="idAmbiente"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreAmbiente">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
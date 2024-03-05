import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MUIDataTable from "mui-datatables";
import api from "../components/api";

export const Area = () => {
    const [modal, setModal] = useState(false);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        listarArea();
    }, []);

    const columns = ["id_area", "nombre"];

    const options = {
        filterType: 'checkbox',
    };

    const toggle = () => {
        setModal(!modal);
    };

    const listarArea = () => {
        api.get('Area/Listar')
            .then(res => {
                setAreas(res.data);
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
                    title={"Área"}
                    data={areas}
                    columns={columns}
                    options={options}
                />
            </div>
            <Button onClick={toggle} className="nuevo-boton">
                Registrar
            </Button>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar Área</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="idArea">ID Área:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="idArea"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombreArea">Nombre:</label>
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

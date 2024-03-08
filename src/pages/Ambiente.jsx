import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import Swal from 'sweetalert2'

export const Ambiente = () => {
    const [modal, setModal] = useState(false);
    const [Ambiente, setAmbiente] = useState([]);
    const [errors, setErrors] = useState([]);
    const [nombre, setNombre] = useState("");

    const handleNames = (e) => setNombre(e.target.value);

    useEffect(() => {
        listarAmbiente();
    }, []);

    const columns = [
        "id_ambiente",
        "nombre",
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

    const toggle = () => {
        setErrors([])
        setModal(!modal)
    };
    const listarAmbiente = () => {
        api.get('ambiente/listar')
            .then(res => {
                setAmbiente(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const registrarAmbiente = () => {

        api.post('ambiente/registrar', { nombre: nombre })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {

                    Swal.fire({
                        title: "Correcto!",
                        text: "Se registró el ambiente correctamente!",
                        icon: "success"
                    });

                    listarAmbiente();
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
            <link rel="stylesheet" href="/public/css/global.css" /><br />
            <link rel="stylesheet" href="/public/css/maquinas.css" /><br />
            <div>
                <MUIDataTable
                    title={"Ambiente"}
                    data={Ambiente}
                    columns={columns}
                    options={options}
                />
            </div>
            <div className="padre">
                <Button onClick={toggle} className="nuevo-boton">
                    Registrar
                </Button>
            </div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar Ambiente</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombreAmbiente">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreAmbiente"
                                onChange={handleNames}
                            />
                            {errors.find(error => error.path === 'nombre') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'nombre').msg}</div>
                            }
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={registrarAmbiente}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};
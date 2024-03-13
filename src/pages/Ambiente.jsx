import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import Swal from 'sweetalert2'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
        customToolbar: () => {
            return (
                <Button onClick={handleExportPDF} color="primary">
                    Descargar PDF
                </Button>
            );
        },
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
    const handleExportPDF = () => {
        const columnsPDF = ["Nombre", "Ubicación", "Descripción"];
        const dataPDF = Ambiente.map(item => [
            item.nombre,
            item.ubicacion,
            item.descripcion
        ]);
    
        const pdf = new jsPDF();
        
        // Agregar bordes alrededor de la hoja
        pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10);
    
        // Agregar imagen en la parte superior izquierda
        const imgData = 'https://www.shutterstock.com/image-vector/coffee-machine-logo-design-260nw-621385727.jpg'; // Reemplaza 'YourBase64ImageString' con la cadena base64 de tu imagen
        pdf.addImage(imgData, 'JPEG', 15, 13, 30, 30); // Ajusta las coordenadas y dimensiones según tus necesidades

        // Generar la tabla
        pdf.autoTable({
            head: [columnsPDF],
            body: dataPDF,
            startY: 40, // Ajusta la posición de inicio de la tabla
        });
    
        pdf.save("ambientes.pdf");
    };
    

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
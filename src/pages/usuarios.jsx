import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';
import Swal from 'sweetalert2';

export const Usuarios = () => {
  const [modal, setModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [errors, setErrors] = useState([]);

  const toggle = () => {
    setErrors([]);
    setModal(!modal);
  };

  const handleNames = (e) => setNombres(e.target.value);
  const handleApellidos = (e) => setApellidos(e.target.value);
  const handleIdentificacion = (e) => setIdentificacion(e.target.value);
  const handleTelefono = (e) => setTelefono(e.target.value);
  const handleCorreo = (e) => setCorreo(e.target.value);
  const handleRol = (e) => setRol(e.target.value);

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
    "rol",
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

  const handleActualizar = (rowIndex) => {
    // Lógica para actualizar el usuario
    console.log(`Actualizar usuario en la fila ${rowIndex}`);
  };

  const handleEliminar = (rowIndex) => {
    // Lógica para eliminar el usuario
    console.log(`Eliminar usuario en la fila ${rowIndex}`);
  };

  const listarUsuarios = () => {
    api.get('usuario/listar')
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const guardarUsuario = () => {
    api.post('usuario/registrar', {
      nombres: nombres,
      apellidos: apellidos,
      identificacion: identificacion,
      telefono: telefono,
      correo: correo,
      rol: rol,
    }).then(res => {
      console.log('DATA: ', res.data);
      if (res.data.errors) {
        console.log('ERRRORS: ', res.data.errors);
        setErrors(res.data.errors);
      } else {
        Swal.fire({
          title: "Correcto!",
          text: "Se registró el usuario correctamente!",
          icon: "success"
        });

        listarUsuarios();
        setModal(false);
        setErrors([]);
      }
    }).catch(err => {
      console.error(err.response);
    });
  };

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
      <div className="padre">
        <Button onClick={toggle} className="nuevo">
          Registrar
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registrar</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <Label>Identificación</Label>
                            <Input onChange={handleIdentificacion} />
                            {errors.find(error => error.path === 'identificacion') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'identificacion').msg}</div>
                            }
                        </Col>
                        <Col md={6}>
                            <Label>Nombres</Label>
                            <Input onChange={handleNames} />
                            {errors.find(error => error.path === 'nombres') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'nombres').msg}</div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>Apellidos</Label>
                            <Input onChange={handleApellidos} />
                            {errors.find(error => error.path === 'apellidos') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'apellidos').msg}</div>
                            }
                        </Col>
                        <Col md={6}>
                            <Label>Teléfono</Label>
                            <Input onChange={handleTelefono} />
                            {errors.find(error => error.path === 'telefono') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'telefono').msg}</div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Label>Correo</Label>
                            <Input onChange={handleCorreo} />
                            {errors.find(error => error.path === 'correo') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'correo').msg}</div>
                            }
                        </Col>
                        <Col md={6}>
                            <Label>Rol</Label>
                            <Input type="select" onChange={handleRol}>
                                {/* <option value="administrador">Administrador</option> */}
                                <option value="">Seleccione una opcion...</option>
                                <option value="usuario">Usuario</option>
                                <option value="tecnico">Técnico</option>
                            </Input>
                            {errors.find(error => error.path === 'rol') &&
                                <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'rol').msg}</div>
                            }
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

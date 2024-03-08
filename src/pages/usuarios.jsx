import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import api from "../components/api";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Row, Col, Label } from 'reactstrap';
import Swal from 'sweetalert2';

export const Usuarios = () => {
  const [modal, setModal] = useState(false);
  const [modalActualizarUsuario, setModalActualizarUsuario] = useState(false);
  const [modalEliminarUsuario, setModalEliminarUsuario] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosBuscar, setUsuarioBuscar] = useState([]);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [activo, setActivo] = useState(true); // Estado por defecto es activo
  const [errors, setErrors] = useState([]);
  const [keyModal, setKeyModal] = useState(0);
  const [idEliminar, setIdEliminar] = useState(0);

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
  const handleActivo = () => setActivo(!activo); // Cambiar el estado de activo/inactivo

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
        customBodyRender: (identificacion, tableMeta, updateValue, id_usuario) => (

          <div>

            <Button color="primary" onClick={() => { setKeyModal(keyModal + 1); buscarUsuario(tableMeta.rowData[1]) }}>
              Actualizar
            </Button>
            <Button color="danger" onClick={() => { setModalEliminarUsuario(true); setIdEliminar(tableMeta.rowData[0]) }}>
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

  const handleActualizar = (id) => {

    console.log(nombres, apellidos, identificacion);
    // Lógica para actualizar el usuario en la base de datos
    api.put(`usuario/actualizar/${id}`, {
      nombres: nombres,
      apellidos: apellidos,
      identificacion: identificacion,
      telefono: telefono,
      correo: correo,
      rol: rol,
      estado: activo,
    }).then(res => {
      if (res.data.errors) {
        console.log('ERRRORS: ', res.data.errors);
        setErrors(res.data.errors);
      } else {
        console.log('Usuario actualizado:', res.data);
        Swal.fire({
          title: "Correcto!",
          text: "Se actualizó el usuario correctamente!",
          icon: "success"
        });
        listarUsuarios();
        setModalActualizarUsuario(false);
        setErrors([]);
      }

    }).catch(err => {
      console.error(err.response);
    });
  };




  const handleEliminar = () => {
    console.log(idEliminar, "hahha")

    // Lógica para eliminar el usuario de la base de datos
    api.delete(`usuario/eliminar/${idEliminar}`)
      .then(res => {
        console.log('Usuario eliminado:', res.data);
        Swal.fire({
          title: "Correcto!",
          text: "Se eliminó el usuario correctamente!",
          icon: "success"
        });
        listarUsuarios();
        setModalEliminarUsuario(false);
      })
      .catch(err => {
        console.error(err.response);
      });
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
  const buscarUsuario = (id_usuario) => {

    api.get('usuario/buscar/' + id_usuario)
      .then(res => {
        const data = res.data
        console.log(data)
        setNombres(data["nombres"] ? data["nombres"] : "");
        setApellidos(data["apellidos"] ? data["apellidos"] : "");
        setIdentificacion(data["identificacion"] ? data["identificacion"] : "");
        setTelefono(data["telefono"] ? data["telefono"] : "");
        setCorreo(data["correo"] ? data["correo"] : "");
        setRol(data["rol"] ? data["rol"] : "");
        setActivo(data["estado"] ? data["estado"] : "");


        setUsuarioBuscar(res.data);
        setModalActualizarUsuario(true)
        console.log(res)
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

      {/* Modal para Registrar */}
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

      {/* Modal para Actualizar */}
      {modalActualizarUsuario ?

        <div key={keyModal}>
          <Modal isOpen={true} toggle={() => { setModalActualizarUsuario(!modalActualizarUsuario) }}>
            <ModalHeader toggle={() => setModalActualizarUsuario(!modalActualizarUsuario)}>Actualizar</ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <Label>Identificación</Label>
                  <Input defaultValue={usuariosBuscar["identificacion"] ? usuariosBuscar["identificacion"] : ""} onChange={handleIdentificacion} />
                  {errors.find(error => error.path === 'identificacion') &&
                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'identificacion').msg}</div>
                  }
                </Col>
                <Col md={6}>
                  <Label>Nombres</Label>
                  <Input defaultValue={usuariosBuscar["nombres"] ? usuariosBuscar["nombres"] : ""} onChange={handleNames} />
                  {errors.find(error => error.path === 'nombres') &&
                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'nombres').msg}</div>
                  }
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Apellidos</Label>
                  <Input defaultValue={usuariosBuscar["apellidos"] ? usuariosBuscar["apellidos"] : ""} onChange={handleApellidos} />
                  {errors.find(error => error.path === 'apellidos') &&
                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'apellidos').msg}</div>
                  }
                </Col>
                <Col md={6}>
                  <Label>Teléfono</Label>
                  <Input defaultValue={usuariosBuscar["telefono"] ? usuariosBuscar["telefono"] : ""} onChange={handleTelefono} />
                  {errors.find(error => error.path === 'telefono') &&
                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'telefono').msg}</div>
                  }
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Correo</Label>
                  <Input defaultValue={usuariosBuscar["correo"] ? usuariosBuscar["correo"] : ""} onChange={handleCorreo} />
                  {errors.find(error => error.path === 'correo') &&
                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'correo').msg}</div>
                  }

                </Col>
                <Col md={6}>
                  <Label>Rol</Label>

                  <Input defaultValue={usuariosBuscar["rol"] ? usuariosBuscar["rol"] : ""} type="select" onChange={handleRol}>
                    {/* <option value="administrador">Administrador</option> */}
                    <option value="">Seleccione una opcion...</option>
                    <option value="administrador">Administrador</option>
                    <option value="usuario">Usuario</option>
                    <option value="tecnico">Técnico</option>
                  </Input>
                  {errors.find(error => error.path === 'rol') &&
                    <div className="error-validacion" style={{ color: 'red' }}>{errors.find(error => error.path === 'rol').msg}</div>
                  }
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {console.log(usuariosBuscar["estado"])}
                  <Label>Estado</Label>
                  <Input defaultValue={usuariosBuscar["estado"] ? usuariosBuscar["estado"] : ""} type="select" onChange={handleActivo}>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </Input>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleActualizar(usuariosBuscar["id_usuario"] ? usuariosBuscar["id_usuario"] : "")}>
                Guardar cambios
              </Button>{' '}
              <Button color="secondary" onClick={() => setModalActualizarUsuario(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        : ""}


      {/* Modal para Eliminar */}
      <Modal isOpen={modalEliminarUsuario} toggle={() => setModalEliminarUsuario(!modalEliminarUsuario)}>
        <ModalHeader toggle={() => setModalEliminarUsuario(!modalEliminarUsuario)}>Eliminar</ModalHeader>
        <ModalBody>
          ¿Estás seguro de eliminar el usuario con id {idEliminar}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleEliminar()}>
            Confirmar eliminación
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalEliminarUsuario(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

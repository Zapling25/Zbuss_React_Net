import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { mostrarAlerta } from '../function'; 
import oZbussConfiguration from '../settingsApi.json';

const ListarUsuarios = () => {
    const url= oZbussConfiguration.ServiceApiUrl;
    const [usuarios, setUsuarios]=useState([]);
    const [id, setId]=useState('');
    const [nombre, setNombre]=useState('');
    const [apellido, setApellido]=useState('');
    const [correo, setCorreo]=useState('');
    
    const [operacion, setOperacion]=useState(1);
    const [titulo, setTitulo]=useState('');

    useEffect( ()=>{
        getUsuarios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getUsuarios = async () => {
        const respuesta = await axios.get(url + "/usuario/listar");
        setUsuarios(respuesta.data);
    }
    const openModal = (op,id,nombre,apellido,correo) =>{
        setId('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setOperacion(op);
        if(op === 1){
            setTitulo('Registrar Usuario');
        }
        else if(op === 2){
            setTitulo('Editar Usuario');
            setId(id);
            setNombre(nombre);
            setApellido(apellido);
            setCorreo(correo);
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }
    const validar = () => {
        var parametros;
        if(nombre.trim() === ''){
            mostrarAlerta('Escribe el nombre del Usuario','warning');
        }
        else if(apellido.trim() === ''){
            mostrarAlerta('Escribe el apellido del Usuario','warning');
        }
        else if(correo.trim() === ''){
            mostrarAlerta('Escribe el correo del Usuario','warning');
        }
        else{
            if(operacion === 1){
                parametros = {
                    Nombres:nombre.trim().toUpperCase(),
                    Apellidos:apellido.trim().toUpperCase(),
                    Correo:correo.trim()
                }
            }
            else{
                parametros = {
                    Id:id,
                    Nombres:nombre.trim().toUpperCase(),
                    Apellidos:apellido.trim().toUpperCase(),
                    Correo:correo.trim()
                }
            }
            enviarSolicitud('POST','/usuario/guardar',parametros);
        }
    }
    const enviarSolicitud = async(metodo,ruta,parametros) => {
        await axios({ 
            method: metodo,
            url: url + ruta,
            data: parametros,
            })
            .then(function(respuesta){
            var indicador = respuesta.data.indicadorRespuesta;
            var msj = respuesta.data.mensajeRespuesta;
            if(indicador === "1"){
                mostrarAlerta(msj,'success');
                document.getElementById('btnCerrar').click();
                getUsuarios();
            }
            else{
                mostrarAlerta(msj,'warning');
            }
        })
        .catch(function(error){
            mostrarAlerta('Error en la solicitud','error');
            console.log(error);
        });
    }
    const eliminarUsuario = (idUsuario,nombreUsuario) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Estás seguro de eliminar el usuario ' + nombreUsuario + '?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                enviarSolicitud('POST','/usuario/eliminar?Id=' + idUsuario,'');
            }
            else{
                mostrarAlerta('El usuario NO fue eliminado','info');
            }
        })
    }

  return (
    <div className='App'>
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-4 offset-4'>
                    <div className='d-grid mx-auto'>
                        <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                            <i className='fa-solid fa-circle-plus'></i> Añadir
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offse-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>NOMBRES</th>
                                    <th>APELLIDOS</th>
                                    <th>CORREO</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {usuarios.map( (usuario,i)=>(
                                    <tr key={usuario.id}>
                                        <td>{(i+1)}</td>
                                        <td>{usuario.nombres}</td>
                                        <td>{usuario.apellidos}</td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            <button onClick={() => openModal(2,usuario.id,usuario.nombres,usuario.apellidos,usuario.correo)} 
                                                className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsuarios'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            &nbsp;
                                            <button onClick={() => eliminarUsuario(usuario.id,usuario.nombres)} className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                        </td>                                    
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id='modalUsuarios' className='modal fade' aria-hidden="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className="modal-header">
                        <label className='h5'>{titulo}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type="hidden" id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                            <input type="text" id='nombre' className='form-control' placeholder='Nombre' value={nombre} 
                            onChange={(e)=> setNombre(e.target.value)}/>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-address-card'></i></span>
                            <input type="text" id='apellido' className='form-control' placeholder='Apellido' value={apellido} 
                            onChange={(e)=> setApellido(e.target.value)}/>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-envelope'></i></span>
                            <input type="text" id='correo' className='form-control' placeholder='Correo electrónico' value={correo} 
                            onChange={(e)=> setCorreo(e.target.value)}/>
                        </div>
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i>
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListarUsuarios
import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { mostrarAlerta } from '../function'; 
import oZbussConfiguration from '../settingsApi.json';
import '../css/Zbuss.css';

const ListarBuses = () => {
    const url= oZbussConfiguration.ServiceApiUrl;
    const [buses, setBuses]=useState([]);
    const [id, setId]=useState('');
    const [placa, setPlaca]=useState('');
    const [pesoNeto, setPesoNeto]=useState('');
    const [categoria, setCategoria]=useState('');
    const [pisos, setPisos]=useState(0);
    const [asientosPiso1, setAsientosPiso1]=useState('');
    const [asientosPiso2, setAsientosPiso2]=useState('');
    
    const [operacion, setOperacion]=useState(1);
    const [titulo, setTitulo]=useState('');

    useEffect( ()=>{
        getBuses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getBuses = async () => {
        const respuesta = await axios.get(url + "/bus/listar");
        setBuses(respuesta.data);
    }
    const openModal = (op,id,placa,pesoNeto,categoria,pisos,asientosPiso1,asientosPiso2) =>{
        setId('');
        setPlaca('');
        setPesoNeto('');
        setCategoria('');
        setPisos(0);
        setAsientosPiso1('');
        setAsientosPiso2('');
        setOperacion(op);
        if(op === 1){
            setTitulo('Registrar Bus');
        }
        else if(op === 2){
            setTitulo('Editar Bus');
            setId(id);
            setPlaca(placa);
            setPesoNeto(pesoNeto);
            setCategoria(categoria);
            setPisos(pisos);
            setAsientosPiso1(asientosPiso1);
            setAsientosPiso2(asientosPiso2);
        }
        window.setTimeout(function(){
            document.getElementById('placa').focus();
        },500);
    }
    const validar = () => {
        var parametros;
        if(placa.trim() === ''){
            mostrarAlerta('Escribe la placa del bus','warning');
        }
        else if(placa.trim().length < 7){
            mostrarAlerta('La placa del bus debe tener 6 dígitos','warning');
        }
        else if(pesoNeto.trim() === ''){
            mostrarAlerta('Escribe el peso del bus','warning');
        }
        else if(categoria.trim() === ''){
            mostrarAlerta('Escribe la categoría del bus','warning');
        }
        else if(pisos === 0){
            mostrarAlerta('Eliga la cantidad de pisos del bus','warning');
        }
        else if(pisos === 1 && asientosPiso1.trim() === ''){
            if (asientosPiso1.trim() === ''){
                mostrarAlerta('Digita la cantidad de asientos para el piso 1','warning');
            }
        }
        else if(pisos === 2 && (asientosPiso1.trim() === '' || asientosPiso2.trim() === '')){
            if (asientosPiso1.trim() === ''){
                mostrarAlerta('Digita la cantidad de asientos para el piso 1','warning');
            }
            else if (asientosPiso2.trim() === ''){
                mostrarAlerta('Digita la cantidad de asientos para el piso 2','warning');
            }
        }
        else{
            if(operacion === 1){
                parametros = {
                    Placa:placa.trim().toUpperCase(),
                    PesoNeto:pesoNeto,
                    Categoria:categoria.trim().toUpperCase(),
                    Pisos:pisos,
                    AsientosPiso1:asientosPiso1 === '' ? 0 : parseInt(asientosPiso1),
                    AsientosPiso2:asientosPiso2 === '' ? 0 : parseInt(asientosPiso2)
                }
            }
            else{
                parametros = {
                    Id:id,
                    Placa:placa.trim().toUpperCase(),
                    PesoNeto:pesoNeto,
                    Categoria:categoria.trim().toUpperCase(),
                    Pisos:pisos,
                    AsientosPiso1:asientosPiso1 === '' ? 0 : parseInt(asientosPiso1),
                    AsientosPiso2:asientosPiso2 === '' ? 0 : parseInt(asientosPiso2)
                }
            }
            enviarSolicitud('POST','/bus/guardar',parametros);
        }
    }
    const enviarSolicitud = async(metodo,ruta,parametros) => {
        await axios({ method: metodo, url: url + ruta, data: parametros,})
            .then(function(respuesta){
                var indicador = respuesta.data.indicadorRespuesta;
                var msj = respuesta.data.mensajeRespuesta;
                if(indicador === "1"){
                    mostrarAlerta(msj,'success');
                    document.getElementById('btnCerrar').click();
                    getBuses();
                }
                else{
                    mostrarAlerta(msj,'warning');
                }
            }
        )
        .catch(function(error){
            mostrarAlerta('Error en la solicitud','error');
            console.log(error);
        });
    }
    const eliminarBus = (idBus,placa) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Estás seguro de eliminar el bus con placa ' + placa + '?',
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                enviarSolicitud('POST','/bus/eliminar?Id=' + idBus,'');
            }
            else{
                mostrarAlerta('El bus NO fue eliminado','info');
            }
        })
    }

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-4">
                        <div className="d-grid mx-auto">
                            <button
                                onClick={() => openModal(1)}
                                className="btn btn-dark zb-bg-light"
                                data-bs-toggle="modal"
                                data-bs-target="#modalBuses"
                            >
                                <i className="fa-solid fa-circle-plus"></i>{" "}
                                Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offse-0 offset-lg-2">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>PLACA</th>
                                        <th>PESO NETO</th>
                                        <th>CATEGORIA</th>
                                        <th>NRO. ASIENTOS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {buses.map((bus, i) => (
                                        <tr key={bus.id}>
                                            <td>{i + 1}</td>
                                            <td>{bus.placa}</td>
                                            <td>{bus.pesoNeto} Kg.</td>
                                            <td>{bus.categoria}</td>
                                            <td>{bus.asientos}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        openModal(
                                                            2,
                                                            bus.id,
                                                            bus.placa,
                                                            bus.pesoNeto,
                                                            bus.categoria,
                                                            bus.pisos,
                                                            bus.asientosPiso1,
                                                            bus.asientosPiso2
                                                        )
                                                    }
                                                    className="btn btn-warning"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalBuses"
                                                >
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                                &nbsp;
                                                <Link
                                                    to={`/asientos/${bus.id}`}
                                                >
                                                    <button className="btn btn-success">
                                                        <i className="fa-solid fa-couch"></i>
                                                    </button>
                                                </Link>
                                                &nbsp;
                                                <button
                                                    onClick={() =>
                                                        eliminarBus(
                                                            bus.id,
                                                            bus.placa
                                                        )
                                                    }
                                                    className="btn btn-danger"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
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
            <div id="modalBuses" className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titulo}</label>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-bus"></i>
                                </span>
                                <input
                                    type="text"
                                    id="placa"
                                    className="form-control"
                                    placeholder="Placa"
                                    maxLength={7}
                                    value={placa}
                                    onChange={(e) => {
                                        var inputValue = e.target.value.replace(
                                            /[^a-zA-Z0-9]/g,
                                            ""
                                        );
                                        if (inputValue.length > 3) {
                                            inputValue =
                                                inputValue.slice(0, 3) +
                                                "-" +
                                                inputValue.slice(3);
                                        }
                                        setPlaca(inputValue.toUpperCase());
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-weight-hanging"></i>
                                </span>
                                <input
                                    type="text"
                                    id="pesoNeto"
                                    className="form-control"
                                    placeholder="Peso Neto (kg)"
                                    maxLength={5}
                                    value={pesoNeto}
                                    onChange={(e) => {
                                        const inputValue =
                                            e.target.value.replace(
                                                /[^0-9]/g,
                                                ""
                                            );
                                        setPesoNeto(inputValue);
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-tag"></i>
                                </span>
                                <input
                                    type="text"
                                    id="categoria"
                                    className="form-control"
                                    placeholder="Categoría"
                                    maxLength={50}
                                    value={categoria}
                                    onChange={(e) => {
                                        const inputValue =
                                            e.target.value.replace(
                                                /[^A-Za-z ]/g,
                                                ""
                                            );
                                        setCategoria(inputValue.toUpperCase());
                                    }}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-bus"></i>
                                </span>
                                <select
                                    type="text"
                                    id="nroPisos"
                                    className="form-select"
                                    placeholder="Numero de pisos"
                                    value={pisos}
                                    onChange={(e) => {
                                        setPisos(parseInt(e.target.value));
                                    }}
                                >
                                    <option defaultValue value="0">
                                        Elija cantidad de pisos
                                    </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                            {pisos > 0 ? (
                                <>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-couch"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="asientosPiso1"
                                            className="form-control"
                                            placeholder="Cantidad de asientos del piso 1"
                                            maxLength={2}
                                            value={asientosPiso1}
                                            onChange={(e) => {
                                                var inputValue = e.target.value.replace(/[^0-9]/g, "");
                                                setAsientosPiso1(inputValue);
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {pisos > 1 ? (
                                <>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-couch"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="asientosPiso2"
                                            className="form-control"
                                            placeholder="Cantidad de asientos del piso 2"
                                            maxLength={2}
                                            value={asientosPiso2}
                                            onChange={(e) => {
                                                var inputValue = e.target.value.replace(/[^0-9]/g, "");
                                                setAsientosPiso2(inputValue);
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className="d-grid col-6 mx-auto">
                                <button
                                    onClick={() => validar()}
                                    className="btn btn-success"
                                >
                                    <i className="fa-solid fa-floppy-disk"></i>
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="btnCerrar"
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListarBuses;
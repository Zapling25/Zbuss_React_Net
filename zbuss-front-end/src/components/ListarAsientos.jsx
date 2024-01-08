import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { mostrarAlerta } from '../function';
import oZbussConfiguration from "../settingsApi.json";
import "../css/Zbuss.css";
import "../css/Asientos/Asientos.css";

const ListarAsientos = () => {
    const url = oZbussConfiguration.ServiceApiUrl;
    const { id } = useParams();
    const [asientos, setAsientos] = useState([]);
    const [numeroAsiento, setNumeroAsiento] = useState("");
    const [inclinacionAsiento, setInclinacionAsiento] = useState("");
    const [opcionesBloque, setOpcionesBloque] = useState([]);

    const [mostrarDiv, setMostrarDiv] = useState(false);
    const [hayCambios, setHayCambios] = useState(false);

    const asientosPorFila = 2; // Número de asientos por fila
    let asientoNro = 0;

    useEffect(() => {
        getAsientos();
        getOpcionesBloque();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAsientos = async () => {
        const respuesta = await axios.get(url + "/asiento/listar?IdBus=" + id);
        setAsientos(respuesta.data);
    };
    console.log(asientos);

    const getOpcionesBloque = async () => {
        const respuesta = await axios.get(url + "/asiento/listarOpciones");
        setOpcionesBloque(respuesta.data);
    };
    console.log(opcionesBloque);

    const renderAsiento = (index) => {
        asientoNro++;
        return (
            <div
                key={index}
                className="asiento"
                onClick={handleAsientoClick}
                data-tipo="01" //Por cambiar al listar los asientos del bus
                data-inclinacion={180} //Por cambiar al listar los asientos del bus
            >
                {asientoNro < 10 ? `0${asientoNro}` : asientoNro}
            </div>
        );
    };

    const renderFila = (filaIndex) => (
        <div key={filaIndex} className="fila">
            <div className="seccion">
                {[...Array(asientosPorFila)].map((_, index) => renderAsiento(index))}
            </div>
            <div className="seccion">
                {[...Array(asientosPorFila)].map((_, index) => renderAsiento(index))}
            </div>
        </div>
    );

    const renderFilas = (filas) => {
        const filasRenderizadas = [];
        for (let i = 0; i < filas; i++) {
            filasRenderizadas.push(renderFila(i));
        }
        return filasRenderizadas;
    };

    const handleTipoBloqueChange = (event) => {
        setHayCambios(true);
        // Aquí puedes agregar la lógica de validación según el valor seleccionado
        const nuevoValor = event.target.value;
        
        // Ejemplo: Ocultar el div si el valor seleccionado es "1"
        setMostrarDiv(nuevoValor === "01");
    };

    const handleAsientoClick = (event) => {
        // Aquí puedes realizar alguna acción cuando se hace clic en el asiento
        document.getElementById("tipoBloque").disabled = false;

        const tipo = event.target.getAttribute("data-tipo");

        // Obtener referencia al elemento <select>
        const selectElement = document.getElementById("tipoBloque");

        // Cambiar la opción seleccionada
        selectElement.value = tipo;

        if (tipo === "01"){
            setMostrarDiv(true);
            setNumeroAsiento(event.target.innerText);
            setInclinacionAsiento(event.target.getAttribute("data-inclinacion"));
        }
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-8">
                    <div className="containerbus">
                        <div className="autobus">
                            <div className="asientos">{renderFilas(5)}</div>
                        </div>
                    </div>
                    <div className="containerbus">
                        <div className="autobus">
                            <div className="asientos">{renderFilas(12)}</div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="panel-detalle">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-bus"></i>
                            </span>
                            <select
                                type="text"
                                id="tipoBloque"
                                className="form-select"
                                placeholder="Selecciona tipo de bloque"
                                onChange={handleTipoBloqueChange}
                                disabled={true}
                            >
                                <option defaultValue>
                                    Elige el tipo de bloque
                                </option>
                                {opcionesBloque.map((opcion, i) => (
                                    <option key={i} value={opcion.codigoOpcion}>
                                        {opcion.opcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {mostrarDiv && (
                            <>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-weight-hanging"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="numeroAsiento"
                                        className="form-control"
                                        placeholder="Numero de asiento"
                                        maxLength={2}
                                        value={numeroAsiento}
                                        onChange={(e)=> {
                                            var inputValue = e.target.value.replace(/[^0-9]/g, '');
                                            setNumeroAsiento(inputValue);
                                        }}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-tag"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="inclinacionAsiento"
                                        className="form-control"
                                        placeholder="Inclinación de asiento"
                                        maxLength={3}
                                        value={inclinacionAsiento}
                                        onChange={(e)=> {
                                            var inputValue = e.target.value.replace(/[^0-9]/g, '');
                                            setInclinacionAsiento(inputValue);
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="d-grid col-6 mx-auto">
                <button
                    id="btnGuardar"
                    className="btn btn-success"
                    disabled={!hayCambios}
                >
                    <i className="fa-solid fa-floppy-disk"></i> Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default ListarAsientos;

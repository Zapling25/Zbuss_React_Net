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
    const [inclinacionAsiento, setInclinacionAsiento] = useState(180);
    
    
    const [opcionesBloque, setOpcionesBloque] = useState([]);
    const [idAsientoActual, setIdAsientoActual] = useState(0);

    const [mostrarDiv, setMostrarDiv] = useState(false);
    const [habilitarGuardar, setHabilitarGuardar] = useState(false);

    useEffect(() => {
        getAsientos();
        getOpcionesBloque();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAsientos = async () => {
        const respuesta = await axios.get(url + "/asiento/listar?IdBus=" + id);
        setAsientos(respuesta.data);
    };
    // console.log(asientos);

    const getOpcionesBloque = async () => {
        const respuesta = await axios.get(url + "/asiento/listarOpciones");
        setOpcionesBloque(respuesta.data);
    };
    // console.log(opcionesBloque);

    let NumeroAsiento = 0;
    const renderAsiento = (asiento) => {
        if(asiento){
            if (asiento.tipoBloque === "01") {
                NumeroAsiento++;
            }

            let divContent = "";
            switch (asiento.tipoBloque) {
                case "01":
                    divContent = NumeroAsiento < 10 ? `0${NumeroAsiento}` : NumeroAsiento.toString();
                    break;
                case "02":
                    divContent = <i class="fas fa-toilet"></i>;
                    break;
                case "03":
                    divContent = "";
                    break;
                case "04":
                    divContent = "";
                    break;
                default:
                    break;
            }

            return (
                <div
                    id={asiento.id}
                    className="bloque"
                    data-tipo={asiento.tipoBloque}
                    data-inclinacion={asiento.inclinacion}
                    onClick={handleAsientoClick}
                >{divContent}</div>
            );
        }
        else {
            return (
                <div id={0} className="bloque" data-tipo="04" data-inclinacion="" onClick={handleAsientoClick}></div>
            )
        }
    };

    const renderFilas = ( asientos ) =>{
        const filas = [];

        for (let i = 0; i < asientos.length; i += 4) {
            const filaAsientos = asientos.slice(i, i + 4)

            const fila = (
                <div key={"fila_"+i} className="fila">
                    <div className="seccion">
                        {renderAsiento( filaAsientos[0] )}
                        {renderAsiento( filaAsientos[1] )}
                    </div>
                    <div className="seccion">
                        {renderAsiento( filaAsientos[2] )}
                        {renderAsiento( filaAsientos[3] )}
                    </div>
                </div>
            );
            
            filas.push(fila);
        }

        return filas;
    }
    
    const renderAsientos = () => {
        NumeroAsiento = 0;
        const busesRenderizados = [];

        const asientosPiso1 = asientos.filter(asiento => asiento.piso === 1);
        const asientosPiso2 = asientos.filter(asiento => asiento.piso === 2);
        

        if (asientosPiso1.length > 0){
            const busPiso1 = (
                <div key="piso1" className="containerbus">
                    <div className="autobus">
                        <div className="asientos">
                            {renderFilas(asientosPiso1)}
                        </div>
                    </div>
                </div>
            );

            busesRenderizados.push(busPiso1);
        }
        if (asientosPiso2.length > 0){
            const busPiso2 = (
                <div key="piso2" className="containerbus">
                    <div className="autobus">
                        <div className="asientos">
                            {renderFilas(asientosPiso2)}
                        </div>
                    </div>
                </div>
            );

            busesRenderizados.push(busPiso2);
        }
        return busesRenderizados;
    }

    const handleTipoBloqueChange = (event) => {
        setHabilitarGuardar(true);
        const nuevoValor = event.target.value;
        setMostrarDiv(nuevoValor === "01");

        var divAsiento = document.getElementById(idAsientoActual);
        divAsiento.setAttribute("data-tipo", nuevoValor);

        //Aplicando cambios a la lista de asientos
        const asiento = asientos.find(asiento => asiento.id === idAsientoActual);
        asiento.tipoBloque = nuevoValor;
    };

    const handleAsientoClick = (event) => {
        //Seleccionando el div del bloque para evitar que se seleccione el icono en lugar del div
        const divAsiento = event.target.closest(".bloque");

        if (divAsiento) {
            //Quitando el select al anterior div y poniendo el select al nuevo div
            const asientos = document.getElementsByClassName("bloque");
            for (var i = 0; i < asientos.length; i++) {
                asientos[i].classList.remove("selected");
            }
            divAsiento.classList.add("selected");
            setIdAsientoActual(parseInt(divAsiento.id));

            // Activando el formulario y llenando campos del bloque actual
            const tipo = divAsiento.getAttribute("data-tipo");
            const selectElement = document.getElementById("tipoBloque");
            selectElement.disabled = false;
            selectElement.value = tipo;
            if (tipo === "01") {
                setMostrarDiv(true);
                setNumeroAsiento(divAsiento.innerHTML);
                setInclinacionAsiento(divAsiento.getAttribute("data-inclinacion"));
            }
            else {
                setMostrarDiv(false);
            }
        }
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-8">
                    {renderAsientos()}
                </div>
                <div className="col-4">
                    <div className="panel-detalle">
                        <label className="form-label" htmlFor="tipoBloque">Elije el tipo de bloque</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-cube"></i>
                            </span>
                            <select
                                type="text"
                                id="tipoBloque"
                                className="form-select"
                                placeholder="Selecciona tipo de bloque"
                                onChange={handleTipoBloqueChange}
                                disabled={true}
                            >
                                {opcionesBloque.map((opcion, i) => (
                                    <option key={i} value={opcion.codigoOpcion}>
                                        {opcion.opcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {mostrarDiv && (
                            <>
                                <label className="form-label" htmlFor="numeroAsiento">Número de asiento</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-tag"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="numeroAsiento"
                                        className="form-control"
                                        placeholder="Numero de asiento"
                                        readOnly={true}
                                        value={numeroAsiento}
                                    />
                                </div>
                                <label className="form-label" htmlFor="inclinacionAsiento">Inclinación de Asiento</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-bed"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="inclinacionAsiento"
                                        className="form-control"
                                        placeholder="Inclinación de asiento"
                                        maxLength={3}
                                        value={inclinacionAsiento}
                                        onChange={(e) => {
                                            var inputValue =
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                );
                                            setInclinacionAsiento(inputValue);
                                            document
                                                .getElementById(idAsientoActual)
                                                .setAttribute(
                                                    "data-inclinacion",
                                                    inputValue
                                                );
                                            setHabilitarGuardar(true);
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
                    disabled={!habilitarGuardar}
                >
                    <i className="fa-solid fa-floppy-disk"></i> Guardar Cambios
                </button>
            </div>
        </div>
    );
};

export default ListarAsientos;

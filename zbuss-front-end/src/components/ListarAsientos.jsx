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

    const asientosPorFila = 2; // Número de asientos por fila
    var asientoNro = 0;

    useEffect(() => {
        getAsientos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAsientos = async () => {
        const respuesta = await axios.get(url + "/asiento/listar?IdBus=" + id);
        setAsientos(respuesta.data);
        console.log(asientos);
    };

    const renderAsiento = () => {
        asientoNro++;
        return (
            <div className="asiento">
                <label>{asientoNro < 10 ? `0${asientoNro}` : asientoNro}</label>
            </div>
        );
    };

    const renderFila = () => (
        <div className="fila">
            <div className="seccion">
                {[...Array(asientosPorFila)].map((_, index) =>
                    renderAsiento()
                )}
            </div>
            <div className="seccion">
                {[...Array(asientosPorFila)].map((_, index) =>
                    renderAsiento()
                )}
            </div>
        </div>
    );

    const renderFilas = (filas) => {
        const filasRenderizadas = [];
        for (let i = 0; i < filas; i++) {
            filasRenderizadas.push(renderFila());
        }
        return filasRenderizadas;
    };

    return (
        <>
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
        </>
    );
};

export default ListarAsientos;

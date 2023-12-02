import React,{useState} from 'react';
import axios from 'axios';
import { mostrarAlerta } from '../function'; 
import oZbussConfiguration from '../settingsApi.json';

const Login = () => {

    const url= oZbussConfiguration.ServiceApiUrl;
    const [correo, setCorreo]=useState('');
    const [contrasena, setContrasena]=useState('');

    const validar = () => {
        var parametros;
        if(correo.trim() === ''){
            mostrarAlerta('Ingresa el correo','warning');
        }
        else if(contrasena.trim() === ''){
            mostrarAlerta('Ingresa la contraseña','warning');
        }
        else{
            parametros = {
                Correo:correo.trim(),
                Contrasena:contrasena.trim()
            }
            enviarSolicitud('POST','/login/setLogin',parametros);
        }
    }
    const enviarSolicitud = async(metodo,ruta,parametros) => {
        await axios({ method: metodo, url: url + ruta, data: parametros,})
            .then(function(respuesta){
                var indicador = respuesta.data.indicador;
                var mensaje = respuesta.data.mensaje;
                if(indicador === '0'){
                    mostrarAlerta(mensaje, 'error');
                }
                else if(indicador ==='1'){
                    mostrarAlerta(mensaje, 'success');
                }
            }
        )
        .catch(function(error){
            mostrarAlerta('Error en la solicitud','error');
            console.log(error);
        });
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Inicia Sesión</h3>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control form-control-lg" placeholder='Correo Electrónico' value={correo}
                                    onChange={(e)=> setCorreo(e.target.value)} />
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="contrasena" className="form-control form-control-lg" placeholder='Contraseña' value={contrasena}
                                    onChange={(e)=> setContrasena(e.target.value)} />
                                </div>
                                {/* <!-- Checkbox --> */}
                                {/* <div className="form-check d-flex justify-content-start mb-4">
                                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                    <label className="form-check-label" htmlFo="form1Example3"> Remember password </label>
                                </div> */}
                                <button className="btn btn-primary btn-lg btn-block" type="button" onClick={() => validar()}>Iniciar Sesión</button>
                                <hr className="my-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
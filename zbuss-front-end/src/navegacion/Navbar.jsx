import React from 'react'
import {Link} from 'react-router-dom'
import '../css/Zbuss.css'

const navbar = ({ user, setUser }) => {

    const LogOut = () => {
        setUser('');
    }

    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg zb-bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Zbuss</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {user !== '' ? (
                                <>
                                <li className="nav-item">
                                    <span className='nav-link'>{user.NombreCompleto}</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={LogOut} to="/">Cerrar Sesion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bus">Buses</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/usuario">Usuarios</Link>
                                </li>
                                </>
                            ) :
                                <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                                </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default navbar;
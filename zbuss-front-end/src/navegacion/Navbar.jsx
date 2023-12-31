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
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="." role="button" data-bs-toggle="dropdown" aria-expanded="false">{user.NombreCompleto}</a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" onClick={LogOut} to="/">Cerrar Sesion</Link></li>
                                    </ul>
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
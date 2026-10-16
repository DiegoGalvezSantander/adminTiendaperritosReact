import React from 'react';

export default function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                {usuarios.map(u => (
                    <li key={u.email} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{u.nombre} {u.apellidos}</strong>
                            <br />
                            <small className="text-muted">{u.email}</small>{' '}
                            <span className="badge bg-info">{u.tipo || 'Cliente'}</span>
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => onEditar(u.email)}
                                aria-label={`Editar ${u.nombre}`}
                            >✏️</button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onEliminar(u.email)}
                                aria-label={`Eliminar ${u.nombre}`}
                            >✕</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
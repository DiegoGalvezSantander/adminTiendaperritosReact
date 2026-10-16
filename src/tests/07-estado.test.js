import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { SesionProvider } from '../context/SesionContext';

function renderConProviders(component) {
    return render(
        <BrowserRouter>
            <SesionProvider>{component}</SesionProvider>
        </BrowserRouter>
    );
}

describe('Estado - Login', () => {
    it('actualiza el email al escribir', () => {
        renderConProviders(<Login />);
        const input = screen.getByPlaceholderText(/admin@duoc.cl/i);
        fireEvent.change(input, { target: { value: 'test@duoc.cl' } });
        expect(input.value).toBe('test@duoc.cl');
    });

    it('actualiza la contraseña al escribir', () => {
        renderConProviders(<Login />);
        const input = screen.getByPlaceholderText('••••••••');
        fireEvent.change(input, { target: { value: '1234' } });
        expect(input.value).toBe('1234');
    });

    it('permite escribir en ambos campos', () => {
        renderConProviders(<Login />);
        const email = screen.getByPlaceholderText(/admin@duoc.cl/i);
        const pass = screen.getByPlaceholderText('••••••••');
        fireEvent.change(email, { target: { value: 'a@duoc.cl' } });
        fireEvent.change(pass, { target: { value: 'abcd' } });
        expect(email.value).toBe('a@duoc.cl');
        expect(pass.value).toBe('abcd');
    });

    it('muestra el título de acceso administrador', () => {
        renderConProviders(<Login />);
        expect(screen.getByText(/Acceso Administrador/i)).toBeTruthy();
    });

    it('muestra las credenciales por defecto', () => {
        renderConProviders(<Login />);
        expect(screen.getByText(/admin@duoc.cl \/ 1234/i)).toBeTruthy();
    });
});
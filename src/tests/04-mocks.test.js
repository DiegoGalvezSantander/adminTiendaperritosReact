import { validarEmail, validarRut, crearOrden } from '../utils/productos';

describe('Mocks - Login con spy de obtenerUsuarios', () => {
    let mockObtenerUsuarios;

    beforeEach(() => {
        mockObtenerUsuarios = jasmine.createSpy('obtenerUsuarios').and.returnValue([
            { email: 'admin@duoc.cl', password: '1234', tipo: 'Administrador' },
            { email: 'vendedor@duoc.cl', password: '1234', tipo: 'Vendedor' },
            { email: 'cliente@gmail.com', password: '1234', tipo: 'Cliente' }
        ]);
    });

    it('el mock retorna 3 usuarios', () => {
        const usuarios = mockObtenerUsuarios();
        expect(usuarios.length).toBe(3);
    });

    it('el mock fue llamado al menos una vez', () => {
        mockObtenerUsuarios();
        expect(mockObtenerUsuarios).toHaveBeenCalled();
    });

    it('encuentra usuario admin con credenciales válidas', () => {
        const usuarios = mockObtenerUsuarios();
        const encontrado = usuarios.find(u => u.email === 'admin@duoc.cl' && u.password === '1234');
        expect(encontrado).toBeDefined();
        expect(encontrado.tipo).toBe('Administrador');
    });

    it('encuentra usuario vendedor', () => {
        const usuarios = mockObtenerUsuarios();
        const encontrado = usuarios.find(u => u.tipo === 'Vendedor');
        expect(encontrado).toBeDefined();
    });

    it('NO encuentra usuario con credenciales inválidas', () => {
        const usuarios = mockObtenerUsuarios();
        const encontrado = usuarios.find(u => u.email === 'noexiste@duoc.cl');
        expect(encontrado).toBeUndefined();
    });

    it('rechaza email con dominio no permitido', () => {
        expect(validarEmail('malo@hotmail.com')).toBe(false);
    });
});

describe('Mocks - localStorage', () => {
    beforeEach(() => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
    });

    it('getItem devuelve null cuando está mockeado', () => {
        expect(localStorage.getItem('ordenes')).toBeNull();
    });

    it('el spy fue llamado con la clave correcta', () => {
        localStorage.getItem('carrito');
        expect(localStorage.getItem).toHaveBeenCalledWith('carrito');
    });
});

describe('Mocks - window.alert', () => {
    let alertSpy;

    beforeEach(() => {
        alertSpy = spyOn(window, 'alert').and.callFake(() => {});
    });

    it('el alert puede ser mockeado sin bloquear', () => {
        window.alert('mensaje de prueba');
        expect(alertSpy).toHaveBeenCalledWith('mensaje de prueba');
    });

    it('el alert no lanza error', () => {
        expect(() => window.alert('test')).not.toThrow();
    });
});

describe('Mocks - crearOrden', () => {
    beforeEach(() => {
        localStorage.clear();
        spyOn(localStorage, 'setItem').and.callThrough();
    });

    it('crearOrden guarda en localStorage', () => {
        crearOrden({
            fecha: '01/01/2026',
            cliente: 'Test',
            email: 'test@duoc.cl',
            total: 5000,
            productos: []
        });
        expect(localStorage.setItem).toHaveBeenCalled();
    });
});

describe('Mocks - validarRut', () => {
    it('acepta RUT válido conocido', () => {
        expect(validarRut('111111111')).toBe(true);
    });

    it('rechaza RUT con dígito verificador incorrecto', () => {
        expect(validarRut('123456789')).toBe(false);
    });

    it('rechaza RUT con letras', () => {
        expect(validarRut('abcdefgh')).toBe(false);
    });
});
import {
    filtrarProductos,
    obtenerCriticos,
    obtenerOfertas,
    validarPassword,
    validarNombre
} from '../utils/productos';

describe('Lógica de negocio - Stock (utils reales)', () => {
    it('detecta productos con stock crítico', () => {
        const productos = [
            { stock: 5, stockCritico: 3 },
            { stock: 2, stockCritico: 5 }
        ];
        expect(obtenerCriticos(productos).length).toBe(1);
    });

    it('detecta múltiples productos críticos', () => {
        const productos = [
            { stock: 1, stockCritico: 5 },
            { stock: 2, stockCritico: 5 },
            { stock: 20, stockCritico: 5 }
        ];
        expect(obtenerCriticos(productos).length).toBe(2);
    });

    it('ningún producto crítico cuando todo está ok', () => {
        const productos = [
            { stock: 50, stockCritico: 5 },
            { stock: 30, stockCritico: 10 }
        ];
        expect(obtenerCriticos(productos).length).toBe(0);
    });

    it('stock igual al crítico se considera crítico', () => {
        expect(obtenerCriticos([{ stock: 5, stockCritico: 5 }]).length).toBe(1);
    });
});

describe('Lógica de negocio - Filtros (utils reales)', () => {
    const productos = [
        { nombre: 'Rascador Premium', categoria: 'Juguetes', precio: 1000, enOferta: true },
        { nombre: 'Cerdito Oink', categoria: 'Juguetes', precio: 3000, enOferta: false },
        { nombre: 'Arnés Gato', categoria: 'Accesorios', precio: 9990, enOferta: true }
    ];

    it('filtra por nombre (case-insensitive)', () => {
        expect(filtrarProductos(productos, { busqueda: 'RASCADOR' }).length).toBe(1);
    });

    it('filtra por categoría', () => {
        expect(filtrarProductos(productos, { categoria: 'Juguetes' }).length).toBe(2);
    });

    it('sin filtros retorna todo', () => {
        expect(filtrarProductos(productos).length).toBe(3);
    });

    it('filtro sin coincidencias retorna vacío', () => {
        expect(filtrarProductos(productos, { busqueda: 'zzzz' }).length).toBe(0);
    });

    it('obtenerOfertas retorna solo productos en oferta', () => {
        expect(obtenerOfertas(productos).length).toBe(2);
    });
});

describe('Lógica de negocio - ValidarPassword', () => {
    it('rechaza contraseña corta (< 4)', () => {
        expect(validarPassword('Ab1').valido).toBe(false);
    });

    it('rechaza contraseña larga (> 10)', () => {
        expect(validarPassword('Abcdefghij1').valido).toBe(false);
    });

    it('rechaza contraseña sin mayúscula', () => {
        expect(validarPassword('abcd1').valido).toBe(false);
    });

    it('rechaza contraseña sin número', () => {
        expect(validarPassword('Abcde').valido).toBe(false);
    });

    it('acepta contraseña válida', () => {
        expect(validarPassword('Abcd1').valido).toBe(true);
    });
});

describe('Lógica de negocio - ValidarNombre', () => {
    it('acepta nombre válido', () => {
        expect(validarNombre('Juan')).toBe(true);
    });

    it('rechaza nombre vacío', () => {
        expect(validarNombre('')).toBe(false);
    });

    it('rechaza nombre excede el máximo', () => {
        expect(validarNombre('a'.repeat(51), 50)).toBe(false);
    });
});
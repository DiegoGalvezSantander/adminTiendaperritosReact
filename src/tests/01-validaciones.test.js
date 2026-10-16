import { validarRut, validarEmail } from '../utils/productos';

describe('Validaciones - RUT', () => {
    it('acepta RUT válido 111111111', () => {
        expect(validarRut('111111111')).toBe(true);
    });
    it('acepta RUT válido 123456785', () => {
        expect(validarRut('123456785')).toBe(true);
    });
    it('rechaza RUT inválido 12345678', () => {
        expect(validarRut('12345678')).toBe(false);
    });
    it('rechaza RUT con letras abcdefgh', () => {
        expect(validarRut('abcdefgh')).toBe(false);
    });
    it('rechaza RUT vacío', () => {
        expect(validarRut('')).toBe(false);
    });
    it('acepta RUT con formato 11.111.111-1', () => {
        expect(validarRut('11.111.111-1')).toBe(true);
    });
});

describe('Validaciones - Email', () => {
    it('acepta @duoc.cl', () => {
        expect(validarEmail('test@duoc.cl')).toBe(true);
    });
    it('acepta @profesor.duoc.cl', () => {
        expect(validarEmail('test@profesor.duoc.cl')).toBe(true);
    });
    it('acepta @gmail.com', () => {
        expect(validarEmail('test@gmail.com')).toBe(true);
    });
    it('rechaza @hotmail.com', () => {
        expect(validarEmail('test@hotmail.com')).toBe(false);
    });
    it('rechaza email vacío', () => {
        expect(validarEmail('')).toBe(false);
    });
    it('rechaza email sin @', () => {
        expect(validarEmail('testduoc.cl')).toBe(false);
    });
    it('rechaza email con más de 100 caracteres', () => {
        const largo = 'a'.repeat(101) + '@duoc.cl';
        expect(validarEmail(largo)).toBe(false);
    });
});
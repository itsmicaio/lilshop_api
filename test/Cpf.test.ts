import Cpf from '../src/Cpf'

test("Deve validar um número de cpf em branco", function () {
  expect(() => new Cpf("")).toThrow(new Error("Invalid CPF"))
})

test("Deve validar CPF com números de digitios diferente de 1", function () {
  expect(() => new Cpf("123.456.789-12/3456")).toThrow(new Error("Invalid CPF"))
})

test("Deve validar CPF com todos os digítos iguais", function () {
  expect(() => new Cpf("11111111111")).toThrow(new Error("Invalid CPF"))
});

test("Cpf inválido retorna 'false'", function () {
  expect(new Cpf("123.445.645-12").isValid()).toBe(false);
})

test("Cpf válido retorna 'true'", function () {
  expect(new Cpf("143.402.457-12").isValid()).toBe(true);
})
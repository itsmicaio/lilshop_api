import Cpf from '../src/Cpf'

test("Deve validar um número de cpf em branco", function () {
  expect(() => new Cpf("")).toThrow(new Error("Invalid CPF"))
})

test("Deve validar CPF com número de digitos maior que 14", function () {
  expect(() => new Cpf("123.456.789-12/3456")).toThrow(new Error("Invalid CPF"))
})

test("Deve validar CPF com número de digitos menor que 11", function () {
  expect(() => new Cpf("123456789")).toThrow(new Error("Invalid CPF"))
})

const CPFsWithSameDigits = [
  "111.111.111-11",
  "222.222.222-22",
  "888.888.888-88"
]

test.each(CPFsWithSameDigits)("Deve validar CPF com todos os digítos iguais", function (cpfString) {
  expect(() => new Cpf(cpfString)).toThrow(new Error("Invalid CPF"))
});

test("Deve validar um CPF inválido", function () {
  expect(() => new Cpf("123.445.645-12")).toThrow(new Error("Invalid CPF"))
})

const validCPFs = [
	"886.634.854-68",
	"47308766870"
];

test.each(validCPFs)("Deve validar um CPF válido", function (cpfString) {
  const cpf = new Cpf(cpfString)
  expect(cpf).toBeDefined();
})
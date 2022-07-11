import Dimension from "../src/Dimension"

test("Deve iniciar uma dimensão com comprimento negativo", function () {
  expect(() => new Dimension(-10, 10, 10, 10)).toThrow("Invalid length")
})

test("Deve iniciar uma dimensão com largura negativa", function () {
  expect(() => new Dimension(10, -10, 10, 10)).toThrow("Invalid width")
})

test("Deve iniciar uma dimensão com altura negativa", function () {
  expect(() => new Dimension(10, 10, -10, 10)).toThrow("Invalid height")
})

test("Deve iniciar uma dimensão com peso negativa", function () {
  expect(() => new Dimension(10, 10, 10, -10)).toThrow("Invalid weight")
})

const dimensions = [
  {dimension: new Dimension(20, 15, 10, 1), volume: 0.003, density: 333},
  {dimension: new Dimension(100, 30, 10, 3), volume: 0.03, density: 100},
  {dimension: new Dimension(200, 100, 50, 40), volume: 1, density: 40}
]

test.each(dimensions)("Deve calcular o volume em metros cubicos", function ({dimension, volume}) {
  expect(dimension.calculateVolume()).toBe(volume)
})

test.each(dimensions)("Deve calcular a densidade em kilos / metros cubicos", function ({dimension, density}) {
  expect(dimension.calculateDensity()).toBe(density)
})


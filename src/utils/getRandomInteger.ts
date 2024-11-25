export const getRandomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

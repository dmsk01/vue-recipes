export const getEmptyIngredient = () => {
  return {
    id: Math.random().toString(36).slice(2),
    title: '',
    measure: ''
  }
}
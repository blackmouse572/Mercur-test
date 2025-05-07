export const adminOrderFields = [
  'id',
  'name',
  'handle',
  'description',
  'photo',
]

export const adminOrderQueryConfig = {
  retrieve: {
    defaults: adminOrderFields,
    isList: false
  }
}

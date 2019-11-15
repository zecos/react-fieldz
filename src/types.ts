export interface ReactFieldzActions {
  setValue: (key: string, newVal) => any
  setValues: (newVals) => any
  resetField: (key: string) => any
  resetFields: () => any
  setTouched: (key: string) => any
}

export interface ReactFieldzActions {
  setValue: (key: string, newVal) => any
  setValues: (newVals) => any
  resetField: (key: string) => any
  resetFields: () => any
  setTouched: (key: string) => any
}

export interface ReactFieldzSingleActions {
  setValue: (newVal) => any
  reset: () => any
  setTouched: () => any
  refreshErrors: () => any
}
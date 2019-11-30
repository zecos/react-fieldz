import { field, fields, IFieldzSingleState } from '@zecos/fieldz'
import { IFieldzInputObject, IFieldzState, FieldzInput } from "@zecos/fieldz/types"
import { ReactFieldzActions, ReactFieldzSingleActions} from './types'
import { useState } from 'react'

export { ReactFieldzActions } from './types'

export const useFields = (fieldProperties: FieldzInput): [IFieldzState, ReactFieldzActions]  => {
  const [actions, setFieldsState] = useState(() => fields(fieldProperties))
  const {
    setValue,
    setValues,
    resetFields,
    resetField,
    setTouched,
    getState,
  } = actions
  
  const reactify = fn => (...args) => {
    fn(...args)
    setFieldsState(actions)
  }
  const reactActions = {
    setValue: reactify(setValue),
    setValues: reactify(setValues),
    resetFields: reactify(resetFields),
    resetField: reactify(resetField),
    setTouched: reactify(setTouched),
    getState,
  }

  return [actions.getState(), reactActions]
}

export const useField = (fieldProperties: FieldzInput): [IFieldzSingleState, ReactFieldzSingleActions]  => {
  const [actions, setFieldState] = useState(() => field(fieldProperties))
  const {
    setValue,
    reset,
    setTouched,
    getState,
    refreshErrors,
  } = actions
  
  const reactify = fn => (...args) => {
    fn(...args)
    setFieldState(actions)
  }
  const reactActions = {
    setValue: reactify(setValue),
    reset: reactify(reset),
    setTouched: reactify(setTouched),
    getState: getState,
    refreshErrors: reactify(refreshErrors),
  }

  return [getState(), reactActions]
}

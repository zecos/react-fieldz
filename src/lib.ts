import { field, fields, IFieldzSingleState } from '@zecos/fieldz'
import { IFieldzInputObject, IFieldzState, FieldzInput } from "@zecos/fieldz/types"
import React, { useState } from 'react'

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

export const useField = (fieldProperties: IFieldzInputObject): [IFieldzSingleState, ReactFieldzSingleActions]  => {
  const [[state, actions], setFieldState] = useState(() => {
    const actions = field(fieldProperties)
    return [actions.getState(), actions]
  })
  const {
    setValue,
    reset,
    setTouched,
    getState,
    refreshErrors,
  } = actions
  
  const reactify = fn => (...args) => {
    fn(...args)
    setFieldState([actions.getState(), actions])
  }
  const reactActions = {
    setValue: reactify(setValue),
    reset: reactify(reset),
    setTouched: reactify(setTouched),
    getState: getState,
    refreshErrors: reactify(refreshErrors),
  }

  return [state, reactActions]
}

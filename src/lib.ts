import { fieldz } from 'fieldz'
import { IFieldzActions, IFieldzState } from "fieldz/types"
import {ReactFieldzActions} from './types'
import { useState } from 'react'


export const useFieldz = (fieldProperties): [IFieldzState, ReactFieldzActions]  => {
  const [[actions, fieldsState], setFieldsState] =
  useState(() => fieldz(fieldProperties))
  const { setState, ...moreActions } = actions
  const reactActions = {} as any
  for (const action in moreActions) {
    reactActions[action] = (...args) => (
      setFieldsState([moreActions, moreActions[action](...args)])
    )
  }

  return [fieldsState, reactActions]
}
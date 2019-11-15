import { IFieldzActions, IFieldzState } from "fieldz/types"
import {ReactFieldzActions} from './types'

export function  useFieldz(fieldProperties: any): [IFieldzState, ReactFieldzActions]

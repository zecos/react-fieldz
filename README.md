### `react-fieldz`

`react-fieldz` is a library built off of [`fieldz`](https://npmjs.org/fieldz).

It provides the `useFieldz` react hook, which simply wraps [`fieldz`](https://npmjs.org/fieldz) in React's useState.

Please see [`fieldz`](https://npmjs.org/fieldz) for more detail on the api.

### Example Usage

```ts
import React from 'react'
import { useFieldz } from '@zecos/react-fieldz'
import { nameValidator } from '@zecos/validatorz'

const fieldProperties = {
  firstName: {
    init: "",
    validate: nameValidator
  },
  customField: {
    validate: (val: string) => {
      if (val !== "hello") {
        return [new Error("value must be hello!")]
      }
      return []
    },
    init: "this is my init value"
  }
}


const camelToTitle = camelCase => camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./g, match => match.toUpperCase())
    .trim()

const App = () => {
  const [state, actions] = useFieldz(fieldProperties)
  const {setValue, setValues, setTouched, resetField, resetFields } = actions

  return (
    <form>
      {Object.entries(state).map(([fieldName, {errors}]) => <div key={fieldName}>Error: {JSON.stringify(errors.map(err => err.toString()))}</div>)}
      {Object.entries(state)
        .map(([fieldName, {errors, value, touched, pristine}]) => (
          <div key={fieldName}>
            {(touched && errors.length) ? <span className="input-error">{errors.map(err => <div>{err.toString()}</div>)}</span> : ""}
            <label htmlFor={fieldName}>{camelToTitle(fieldName)}</label>
            <input
              name={fieldName}
              id={fieldName}
              value={value}
              aria-label={fieldName}
              onChange={e => setValue(fieldName, e.target.value)}
              onBlur={_ => setTouched(fieldName)}
            />
          </div>
        ))
      }
    </form>
  )
}

export default App
```
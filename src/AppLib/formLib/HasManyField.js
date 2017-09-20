import React from 'react'
import { MultiSelect } from 'react-selectize'
import Label from './Label'
import renderValue from './renderValue'
import withOptionItems from './withOptionItems'

class MultiSelectWidget extends React.Component {
  render() {
    const {
      optionItems,
      name,
      uiSchema,
      idSchema,
      required,
      onChange,
      formData,
      disabled,
      readonly,
    } = this.props

    const id = idSchema.$id
    const label = uiSchema["ui:title"] || name
    const valueItems = optionItems
      .filter(option => (formData || []).includes(option.value))

    // NOTE: the reason we do this is to fix a bug in react selectize
    // that package caches the renderValue function and it will use the
    // up to date closure data for the function, we use a instance method
    // to bypass this problem
    this.removeByValue = (value) => {
      const nextFormData = formData.filter(v => v !== value)
      onChange(nextFormData)
    }

    return <div>
      <Label label={label} required={required} id={id} />
      <MultiSelect
        disabled={disabled || readonly}
        values={valueItems}
        options={optionItems}
        onValuesChange={v => {
          onChange(v.map(v => v.value))
        }}
        renderValue={item => renderValue(item, this)}
      />
    </div>
  }
}

const HasManyField = withOptionItems(MultiSelectWidget, 'field')

export default HasManyField

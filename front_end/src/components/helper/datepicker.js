import React from "react";
import { Form } from "antd";
import moment from "moment";

const FormItem = Form.Item;
const dateFormat = 'MM/DD/YYYY';

export const wrapDatePicker = DatePicker => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  defaultValue,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <DatePicker
         format={dateFormat}
         getPopupContainer={trigger => trigger.parentElement}
         {...input}
         {...rest}
         value={moment(input.value || defaultValue, dateFormat)}
      >
        {children}
      </DatePicker>
    </FormItem>
  );
};

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessageLabel from './ErrorMessageLabel';

interface FormElementProps {
  type: string;
  label: string;
  placeholder: string;
  errorText: string;
  hasError: boolean;
  inputData: UseFormRegisterReturn;
}

const FormElement = ({
  type,
  label,
  placeholder,
  hasError,
  inputData,
  errorText,
}: FormElementProps) => {
  return (
    <div className="w-full m-0 float-left  mb-[20px]">
      <label className="inline-block text-base text-[#832BC1] float-left mb-[12px] font-semibold">
        {label}
      </label>
      <input
        className="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        type={type}
        placeholder={placeholder}
        {...inputData}
      />
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default FormElement;

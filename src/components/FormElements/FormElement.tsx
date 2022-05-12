import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessageLabel from './ErrorMessageLabel';

interface FormElementProps {
  type: string;
  label: string;
  labelColor: string;
  placeholder: string;
  errorText: string;
  hasError: boolean;
  inputData: UseFormRegisterReturn;
}

const FormElement = ({
  type,
  label,
  labelColor,
  placeholder,
  hasError,
  inputData,
  errorText,
}: FormElementProps) => {
  const textArea = (
    <textarea
      className="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
      placeholder={placeholder}
      {...inputData}
    ></textarea>
  );
  const input = (
    <input
      className="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
      type={type}
      placeholder={placeholder}
      {...inputData}
    />
  );
  return (
    <div className="w-full m-0 float-left  mb-[25px]">
      <label
        className={`inline-block text-base text-[${labelColor}] float-left mb-[12px] font-semibold`}
      >
        {label}
      </label>
      {type === 'textarea' ? textArea : input}
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default FormElement;

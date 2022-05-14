import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessageLabel from '../ErrorMessageLabel';

interface FormTextAreaProps {
  label: string;
  labelColor: string;
  placeholder: string;
  errorText: string;
  hasError: boolean;
  inputData: UseFormRegisterReturn;
}

const FormTextArea = ({
  label,
  labelColor,
  placeholder,
  hasError,
  inputData,
  errorText,
}: FormTextAreaProps) => {
  return (
    <div className="w-full m-0 float-left  mb-[25px]">
      <label
        className={`inline-block text-base text-[${labelColor}] float-left mb-[12px] font-semibold`}
      >
        {label}
      </label>
      <textarea
        className="border w-full text-base border-solid border-[#AFB0B9] rounded-[999px] pl-23 focus:outline-0 pl-[24px] py-[11px]"
        placeholder={placeholder}
        {...inputData}
      />
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default FormTextArea;

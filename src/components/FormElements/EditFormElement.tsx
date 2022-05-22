import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessageLabel from './ErrorMessageLabel';

interface EditFormElementProps {
  type: string;
  label: string;
  placeholder: string;
  errorText: string;
  hasError: boolean;
  inputData: UseFormRegisterReturn;
}

const EditFormElement = ({
  type,
  label,
  placeholder,
  hasError,
  inputData,
  errorText,
}: EditFormElementProps) => {
  return (
    <div className="text-xs flex flex-col gap-3">
      <label className="form-label mt-2 text-[#AA9BFF]">{label}</label>
      <input
        className="form-control w-[410px] rounded-3xl border-[#AFB0B9] border-[1px] py-[13px] pl-[24px] focus:outline-0"
        type={type}
        placeholder={placeholder}
        {...inputData}
      />
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default EditFormElement;

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
  classNameLabel?: string;
  classNameInput?: string;
}

const FormElement = ({
  type,
  label,
  labelColor,
  placeholder,
  hasError,
  inputData,
  errorText,
  classNameLabel,
  classNameInput,
}: FormElementProps) => {
  const textArea = (
    <textarea className="textarea" placeholder={placeholder} {...inputData}></textarea>
  );
  const input = (
    <input
      className={`input ${classNameInput}`}
      type={type}
      placeholder={placeholder}
      {...inputData}
    />
  );
  return (
    <div className="w-full m-0 mb-[25px]">
      <label
        className={`inline-block text-base text-[${labelColor}] float-left mb-[12px] font-semibold ${classNameLabel}`}
      >
        {label}
      </label>
      {type === 'textarea' ? textArea : input}
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default FormElement;

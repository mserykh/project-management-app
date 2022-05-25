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
  containerClassName: string;
  inputClassName: string;
  labelClassName: string;
}

const FormElement = ({
  type,
  label,
  placeholder,
  hasError,
  inputData,
  errorText,
  containerClassName,
  inputClassName,
  labelClassName,
}: FormElementProps) => {
  const textArea = (
    <textarea className="textarea" placeholder={placeholder} {...inputData}></textarea>
  );
  const input = (
    <input
      className={`input ${inputClassName}`}
      type={type}
      placeholder={placeholder}
      {...inputData}
    />
  );
  return (
    <div className={`${containerClassName} w-full flex flex-col gap-3`}>
      <label className={labelClassName}>{label}</label>
      {type === 'textarea' ? textArea : input}
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default FormElement;

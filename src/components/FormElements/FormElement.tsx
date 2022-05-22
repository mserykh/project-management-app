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
    <textarea
      className="border w-full text-base border-solid border-[#AFB0B9] rounded-3xl pl-23 focus:outline-0 pl-[24px] py-[11px]"
      placeholder={placeholder}
      {...inputData}
    ></textarea>
  );
  const input = (
    <input className={inputClassName} type={type} placeholder={placeholder} {...inputData} />
  );
  return (
    <div className={containerClassName}>
      <label className={labelClassName}>{label}</label>
      {type === 'textarea' ? textArea : input}
      {hasError && <ErrorMessageLabel>{errorText}</ErrorMessageLabel>}
    </div>
  );
};

export default FormElement;

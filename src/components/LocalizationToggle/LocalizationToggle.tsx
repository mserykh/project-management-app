import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

type LanguageDropdownItem = {
  language: string;
  current: boolean;
};

const languages: LanguageDropdownItem[] = [
  { language: 'EN', current: true },
  { language: 'RU', current: false },
];

const LocalizationToggle = (): JSX.Element => {
  const currentLanguage = languages.find((item: LanguageDropdownItem) => item.current)!.language;
  const dropDownItem = languages.find((item: LanguageDropdownItem) => !item.current)!.language;
  const [currentLanguageState, setCurrentLanguageState] = useState<string>(currentLanguage);
  const [dropDownLanguageState, setDropDownLanguageState] = useState<string>(dropDownItem);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickBtn = (): void => {
    setIsOpen(() => !isOpen);
  };

  const handleClickDropdown = (event: React.MouseEvent): void => {
    if (event.currentTarget.textContent) {
      setCurrentLanguageState(event.currentTarget.textContent);
    }
    setDropDownLanguageState(currentLanguage);

    languages.find(
      (item: LanguageDropdownItem) => item.language === event.currentTarget.textContent
    )!.current = true;
    languages.find(
      (item: LanguageDropdownItem) => item.language !== event.currentTarget.textContent
    )!.current = false;
  };

  return (
    <div className="dropdown">
      <div className="dropdownBtn flex items-center">
        <button className="cursor-pointer">{currentLanguageState}</button>
        <ChevronDownIcon
          onClick={handleClickBtn}
          data-testid="toggle" 
          className="-mr-1 ml-2 h-5 w-5 cursor-pointer"
          aria-hidden="true"
          />
      </div>
      {isOpen && (
        <div className="dropdownContent">
          <button className="dropdownItem cursor-pointer" onClick={handleClickDropdown}>
            {dropDownLanguageState}
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalizationToggle;

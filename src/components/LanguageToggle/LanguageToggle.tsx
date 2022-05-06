import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import globalStateSlice from '../../redux/reducers/globalStateSlice';
import i18n from '../../n18i';

enum LanguageDropdownItem {
  EN = 'en',
  RU = 'ru',
}

const languages = [LanguageDropdownItem.EN, LanguageDropdownItem.RU];

const LanguageToggle = (): JSX.Element => {
  const { language } = useAppSelector((state) => state.stateReducer);
  const dispatch = useDispatch();
  const { updateLanguage } = globalStateSlice.actions;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleClickBtn = (): void => {
    setIsOpen(() => !isOpen);
  };

  const handleClickDropdown = (event: React.MouseEvent): void => {
    if (event.currentTarget.textContent) {
      dispatch(updateLanguage(event.currentTarget.textContent.toLowerCase()));
    }
    setIsOpen(() => !isOpen);
  };

  const dropdownItems = [...languages]
    .filter((item: LanguageDropdownItem) => item !== language)
    .map((item: LanguageDropdownItem) => (
      <li key={item}>
        <button className="dropdownItem cursor-pointer" onClick={handleClickDropdown}>
          {item.toUpperCase()}
        </button>
      </li>
    ));

  return (
    <div className="dropdown">
      <div className="dropdownBtn flex items-center">
        <button onClick={handleClickBtn} className="cursor-pointer">
          {language.toUpperCase()}
        </button>
        <ChevronDownIcon
          onClick={handleClickBtn}
          data-testid="toggle"
          className="-mr-1 ml-2 h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      </div>
      {isOpen && <ul className="dropdownContent">{dropdownItems}</ul>}
    </div>
  );
};

export default LanguageToggle;

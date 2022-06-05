import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { updateLanguage } from '../../redux/reducers/globalStateSlice';
import user_options from '../../assets/images/user_options.svg';

enum LanguageDropdownItem {
  EN = 'en',
  RU = 'ru',
}

const languages = [LanguageDropdownItem.EN, LanguageDropdownItem.RU];

const LanguageToggle = (): JSX.Element => {
  const language = useAppSelector((state) => state.globalStateReducer.language);
  const dispatch = useDispatch();

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
        <button className="button button--dropdown" onClick={handleClickDropdown}>
          {item.toUpperCase()}
        </button>
      </li>
    ));

  return (
    <div className="dropdown ml-auto xs:ml-0">
      <div className={`dropdownBtn flex items-center`}>
        <button
          onClick={handleClickBtn}
          className={`text-gray font-medium cursor-pointer${isOpen ? ' text-purple' : ''}`}
        >
          {language.toUpperCase()}
        </button>
        <img
          onClick={handleClickBtn}
          className="p-2 cursor-pointer hover:bg-off-white hover:rounded-full"
          src={user_options}
          alt=""
        />
      </div>
      {isOpen && <ul className="dropdown__content">{dropdownItems}</ul>}
    </div>
  );
};

export default LanguageToggle;

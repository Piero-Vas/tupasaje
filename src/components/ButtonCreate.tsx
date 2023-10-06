'use client';

import {ButtonProps} from 'react-html-props';
import {FaPlus} from 'react-icons/fa';
import {cn} from '@/utils/cn';

interface Props extends ButtonProps {
  name: string;
}

const ButtonCreate: React.FC<Props> = ({name, onClick, className, ...rest}) => {
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          'btn flex flex-row items-center text-white font-bold text-sm bg-primary rounded-full px-4 py-2 hover:bg-secondary',
          className,
        )}
        {...rest}>
        <FaPlus className="mr-2" />
        <span>{name}</span>
      </button>
    </>
  );
};

export default ButtonCreate;

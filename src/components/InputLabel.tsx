'use client';

import {InputProps} from 'react-html-props';

interface Props extends InputProps {
  title: string;
}

// No uso este componente porque da errores respecto a ref en react (forwardRef), y eso no permite usar de manera adecuada react hook form
const InputLabel: React.FC<Props> = ({title, id, ...rest}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-medium text-sm ">
        {title}
      </label>

      <input
        type="text"
        id={id}
        className="w-full py-3 px-5 rounded-br11 bg-bginput text-sm text-black"
        {...rest}
      />
    </div>
  );
};

export default InputLabel;

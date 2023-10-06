'use client';

import {useCallback, useState} from 'react';

export const useBoolean = (defaultValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(x => !x), []);

  return {value, setValue, setTrue, setFalse, toggle};
};

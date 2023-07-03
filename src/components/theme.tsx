import {
  useEffect,
} from 'react';
import { enableTheme } from '../lib/theme';


export const Theme = ({ children }:any) => {
  useEffect(() => enableTheme('dark'), []);

  return (
    <>
      {children}
    </>
  );
};

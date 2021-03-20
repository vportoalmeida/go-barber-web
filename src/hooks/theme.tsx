/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import React, { createContext, useState, useContext } from 'react';

import original from '../styles/themes/original';

interface IThemeContext {
  toggleTheme(): void;
  theme: ITheme;
}

interface ITheme {
  title: string;

  colors: {
    background: string;
    primary: string;
    secondary: string;
    tertiary: string;
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;

    white: string;
    black: string;
    gray: string;

    success: string;
    info: string;
    warning: string;
    go: string;
  };
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ITheme>(() => {
    const savedTheme = localStorage.getItem('@dm-system:theme');

    if (savedTheme) {
      return JSON.parse(savedTheme);
    }
    return original;
  });

  const toggleTheme = () => {
    if (theme.title === 'original') {
      setTheme(original);
      localStorage.setItem('@dm-system:theme', JSON.stringify(original));
    } else {
      setTheme(original);
      localStorage.setItem('@dm-system:theme', JSON.stringify(original));
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);

  return context;
}

export { ThemeProvider, useTheme };

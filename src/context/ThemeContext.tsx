import { createContext, useContext, type FC, type ReactNode } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  border: string;
  disabled: string;
}

export const defaultTheme: ThemeColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',
  light: '#F2F2F7',
  dark: '#1C1C1E',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#000000',
  textLight: '#999999',
  border: '#E0E0E0',
  disabled: '#C7C7CC',
};

export interface ThemeContextType {
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: defaultTheme,
});

export interface ThemeProviderProps {
  theme?: Partial<ThemeColors>;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ theme, children }) => {
  const colors = {
    ...defaultTheme,
    ...theme,
  };

  return (
    <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

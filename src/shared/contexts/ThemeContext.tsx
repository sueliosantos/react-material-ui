import { createContext, useCallback } from "react";
import { ThemeProvider } from "@mui/material";
import { LigthTheme, DarkTheme } from "../../shared/themes";
import { useState } from "react";
import { useMemo } from "react";
import { Box } from "@mui/system";
import { useContext } from "react";

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IThemeProvider {
  children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
  }, []);


  const theme = useMemo(() => {
    if (themeName === 'light') return LigthTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};
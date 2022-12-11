import { Search } from "@mui/icons-material";
import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material";

interface IBarraFerramentasListagem {
  textoBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudatTextoBusca?: (mudarTexto: string) => void;

  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;

}

export const BarraFerramentasListagem: React.FC<IBarraFerramentasListagem> = ({
  textoBusca = "", mostrarInputBusca = false, aoMudatTextoBusca,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClicarEmNovo
}) => {
  const theme = useTheme();
  return (
    <Box
      height={theme.spacing(5)}
      component={Paper}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"


    >
      {mostrarInputBusca && (
        <TextField
          value={textoBusca}
          onChange={(e) => aoMudatTextoBusca?.(e.target.value)}
          size="small"
          placeholder="Pesquisar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      )}
      <Box flex={1} display="flex" justifyContent='end'>
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}

          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
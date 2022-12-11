import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IBarraFerramentasDetalhePorps {
  textoBotaoNovo?: string;
  monstrarBotaoNovo?: string;
  monstrarBotaoVoltar?: string;
  monstrarBotaoApagar?: string;
  monstrarBotaoSalvar?: string;
  monstrarBotaoSalvarEFechar?: string;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;

}

export const BarraFerramentasDetalhe: React.FC<IBarraFerramentasDetalhePorps> = ({
  textoBotaoNovo = 'Novo',

  monstrarBotaoNovo = true,
  monstrarBotaoVoltar = true,
  monstrarBotaoApagar = true,
  monstrarBotaoSalvar = true,
  monstrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
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
      {monstrarBotaoSalvar && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          endIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          Salvar
        </Button>

      )}

      {monstrarBotaoSalvarEFechar && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          endIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          Salvar e voltar
        </Button>

      )}

      {monstrarBotaoApagar && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          endIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>

      )}
      {monstrarBotaoNovo &&
        (

          <Button
            color="primary"
            variant="outlined"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}

      <Divider variant="middle" orientation="vertical" />

      {monstrarBotaoVoltar &&
        (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            endIcon={<Icon>arrow_back</Icon>}
            onClick={aoClicarEmVoltar}
          >
            Voltar
          </Button>

        )}
    </Box>
  );
};
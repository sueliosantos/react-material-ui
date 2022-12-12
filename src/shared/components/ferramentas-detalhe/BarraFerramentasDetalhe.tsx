import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IBarraFerramentasDetalhePorps {
  textoBotaoNovo?: string;

  monstrarBotaoSalvar?: string;
  monstrarBotaoSalvarEFechar?: string;
  monstrarBotaoApagar?: string;
  monstrarBotaoNovo?: string;
  monstrarBotaoVoltar?: string;

  monstrarBotaoSalvarCarregando?: boolean;
  monstrarBotaoSalvarEFecharCarregando?: string;
  monstrarBotaoApagarCarregando?: string;
  monstrarBotaoNovoCarregando?: string;
  monstrarBotaoVoltarCarregando?: string;

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

  monstrarBotaoNovoCarregando = false,
  monstrarBotaoVoltarCarregando = false,
  monstrarBotaoApagarCarregando = false,
  monstrarBotaoSalvarCarregando = false,
  monstrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();
  const smDonw = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDonw = useMediaQuery(theme.breakpoints.down('md'));
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
      {(monstrarBotaoSalvar && !monstrarBotaoSalvarCarregando) && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          endIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>
        </Button>
      )}

      {monstrarBotaoSalvarCarregando && (
        < Skeleton width={110} height={60} />
      )}

      {(monstrarBotaoSalvarEFechar && !monstrarBotaoSalvarEFecharCarregando && !smDonw && !mdDonw) && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          endIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {(monstrarBotaoSalvarEFecharCarregando && !smDonw && !mdDonw) && (
        <Skeleton width={180} height={60} />
      )}

      {(monstrarBotaoApagar && !monstrarBotaoApagarCarregando) && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          endIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>
      )}

      {monstrarBotaoApagarCarregando && (

        <Skeleton width={110} height={60} />
      )}
      {(monstrarBotaoNovo && !monstrarBotaoNovoCarregando && !smDonw) &&
        (

          <Button
            color="primary"
            variant="outlined"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >
            <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
              {textoBotaoNovo}
            </Typography>
          </Button>
        )}
      {(monstrarBotaoNovoCarregando && !smDonw) && (
        <Skeleton width={110} height={60} />
      )}

      {monstrarBotaoVoltar &&
        (monstrarBotaoNovo || monstrarBotaoApagar || monstrarBotaoSalvar || monstrarBotaoSalvarEFechar) &&
        (
          <Divider variant="middle" orientation="vertical" />
        )}

      {(monstrarBotaoVoltar && !monstrarBotaoVoltarCarregando) &&
        (
          <Button
            color="primary"
            variant="outlined"
            disableElevation
            endIcon={<Icon>arrow_back</Icon>}
            onClick={aoClicarEmVoltar}
          >
            <Typography variant="button" whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
              Voltar
            </Typography>
          </Button>
        )}

      {monstrarBotaoVoltarCarregando && (
        <Skeleton width={110} height={60} />
      )}
    </Box>
  );
};
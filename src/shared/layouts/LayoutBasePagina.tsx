import { Box, Icon } from "@mui/material";
import { Typography, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDrawerContext } from "../contexts";

interface ILayoutBasePagina {
  titulo: string;
  barraDeFerramentas?: React.ReactNode
  children: React.ReactNode
}
export const LayoutBasePagina: React.FC<ILayoutBasePagina> = ({ children, titulo, barraDeFerramentas }) => {
  const theme = useTheme();
  const smDonw = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDonw = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >
      <Box
        display="flex"
        alignItems='center'
        padding={1}
        height={theme.spacing(smDonw ? 6 : mdDonw ? 8 : 12)}
        gap={1}>
        {smDonw && (<IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>)}
        <Typography
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          variant={smDonw ? "h5" : mdDonw ? 'h4' : 'h3'}
        >

          {titulo}
        </Typography>
      </Box>

      {
        barraDeFerramentas && (<Box>
          {barraDeFerramentas}
        </Box>)
      }

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box >
  );
};
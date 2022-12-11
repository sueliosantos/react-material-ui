import Box from "@mui/material/Box";
import { BarraFerramentasDetalhe, BarraFerramentasListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBasePagina titulo="Página inicial"
      //barraDeFerramentas={(<BarraFerramentasListagem mostrarInputBusca />)
      barraDeFerramentas={(<BarraFerramentasDetalhe monstrarBotaoSalvarEFechar="true" />)}>
      testando


    </LayoutBasePagina >

  );
};
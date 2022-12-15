import { BarraFerramentasDetalhe, BarraFerramentasListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBasePagina titulo="Página inicial"
      barraDeFerramentas={(<BarraFerramentasDetalhe monstrarBotaoSalvarEFechar />)}>
      testando


    </LayoutBasePagina >

  );
};
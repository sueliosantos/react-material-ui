import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BarraFerramentasListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoa/PessoaService";

export const ListagemPessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);


  useEffect(() => {

    debounce(() => {
      PessoaService.getAll(1, busca)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            return;
          } else {
            console.log(result);
          }

        });
    });

  }, [busca]);

  return (
    <LayoutBasePagina titulo="Listagem de pessoas"
      barraDeFerramentas={
        <BarraFerramentasListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoBusca={busca}
          aoMudatTextoBusca={texto => setSearchParams({ busca: texto }, { replace: true })} />}>

    </LayoutBasePagina>
  );
};

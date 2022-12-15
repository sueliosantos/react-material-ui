import { useEffect, useMemo, useState } from "react";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BarraFerramentasListagem } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePagina } from "../../shared/layouts";
import { IListagemPessoa, PessoaService } from "../../shared/services/api/pessoa/PessoaService";
import { Environment } from "../../shared/environment";

export const ListagemPessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);


  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoaService.deleteById(id).
        then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRowls => {
              return [...oldRowls.filter(oldRow => oldRow.id !== id)];
            });
            alert("Registro apagado com sucesso");
          }
        });
    }
  };


  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoaService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            return;
          } else {
            setTotalCount(result.totalCount);
            setRows(result.data);
          }

        });
    });

  }, [busca, pagina]);

  return (
    <LayoutBasePagina titulo="Listagem de pessoas"
      barraDeFerramentas={
        <BarraFerramentasListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoBusca={busca}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoMudatTextoBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })} />}
    >


      <TableContainer component={Paper} variant='outlined' sx={{ margin: 1, width: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}>
                <TableCell component="th" scope="row">
                  <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nomeCompleto}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
              </TableRow>
            ))
            }
          </TableBody>

          {totalCount === 0 && !isLoading && (
            (<caption>{Environment.LISTAGEM_VAZIA}</caption>)
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {(totalCount > 0 && totalCount > Environment.LIMITE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}

                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePagina>
  );
};

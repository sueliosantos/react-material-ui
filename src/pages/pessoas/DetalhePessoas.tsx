import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarraFerramentasDetalhe, BarraFerramentasListagem } from "../../shared/components";
import { LayoutBasePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoa/PessoaService";

export const DetalhePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoaService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
          }
        });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoaService.deleteById(id).
        then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Registro apagado com sucesso");
            navigate('/pessoas');
          }
        });
    }
  };

  return (
    <LayoutBasePagina
      titulo={id === 'nova' ? "Nova pessoa" : nome}
      barraDeFerramentas={<BarraFerramentasDetalhe
        textoBotaoNovo="Nova"
        monstrarBotaoSalvarEFechar
        monstrarBotaoNovo={id !== 'nova'}
        monstrarBotaoApagar={id !== 'nova'}

        aoClicarEmSalvar={handleSave}
        aoClicarEmSalvarEFechar={handleSave}
        aoClicarEmApagar={() => handleDelete(Number(id))}

        aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        aoClicarEmVoltar={() => navigate('/pessoas')}
      />}
    >
      {(isLoading && (
        <LinearProgress variant="indeterminate" />
      ))}
      <p>teste</p>
    </LayoutBasePagina >
  );
};
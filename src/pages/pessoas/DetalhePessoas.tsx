import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarraFerramentasDetalhe, BarraFerramentasListagem } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBasePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoa/PessoaService";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
export const DetalhePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
            formRef.current?.setData(result);
          }
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    if (id === 'nova') {

      PessoaService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoaService.updateById(Number(id), { id: Number(id), ...dados }).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        }
      });
    }
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

        aoClicarEmSalvar={() => formRef.current?.submitForm()}
        aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
        aoClicarEmApagar={() => handleDelete(Number(id))}

        aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        aoClicarEmVoltar={() => navigate('/pessoas')}
      />}
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome completo" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade" name="cidadeId" />
      </Form>
    </LayoutBasePagina >
  );
};
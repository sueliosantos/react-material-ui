import { Environment } from "./../../../environment/index";
import { Api } from "../axios-config";

type TPessoaComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

interface IListagemPessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

interface IDetalhePessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

const getAll = async (
  page = 1,
  filter = ""
): Promise<TPessoaComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros"
    );
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const urlRelativa = `/pessoas/${id}`;
    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro"
    );
  }
};

const create = async (
  dados: Omit<IDetalhePessoa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>("pessoas", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro");
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro"
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalhePessoa
): Promise<void | Error> => {
  try {
    await Api.put(`pessoas/${id}`, dados);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao atualizar o registro"
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`pessoas/${id}`);
  } catch (error) {
    return new Error(
      (error as { message: string }).message || "Erro ao excluir o registro"
    );
  }
};

export const PessoaService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

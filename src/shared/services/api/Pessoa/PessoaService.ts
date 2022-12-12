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

const getById = async (): Promise<any> => {
  return;
};

const create = async (): Promise<any> => {
  return;
};

const updateById = async (): Promise<any> => {
  return;
};

const deleteById = async (): Promise<any> => {
  return;
};

export const PessoaService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

export enum OutdoorStatus {
  PLANEJADO = 'planejado',
  EM_PRODUCAO = 'em_producao',
  PRODUCAO_CONCLUIDA = 'producao_concluida',
  EM_INSTALACAO = 'em_instalacao',
  ATIVO = 'ativo',
  MANUTENCAO = 'manutencao',
  INATIVO = 'inativo'
}

export interface IOutdoor {
  id: string;
  cliente: string;
  tamanho: string;
  tipo: string;
  localizacao: string;
  valor: number;
  status: OutdoorStatus;
  observacoes?: string;
  criadoEm: Date;
}

export class Outdoor implements IOutdoor {
  constructor(
    public id: string,
    public cliente: string,
    public tamanho: string,
    public tipo: string,
    public localizacao: string,
    public valor: number,
    public status: OutdoorStatus = OutdoorStatus.PLANEJADO,
    public observacoes: string = '',
    public criadoEm: Date = new Date()
  ) {}
}
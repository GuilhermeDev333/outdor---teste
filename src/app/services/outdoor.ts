import { Injectable } from '@angular/core';
import { Outdoor, OutdoorStatus } from '../models/outdoor.model';

@Injectable({
  providedIn: 'root'
})
export class OutdoorService {
  private outdoors: Outdoor[] = [
    new Outdoor('1', 'João Silva', '9x3m', 'Digital', 'Av. Paulista, 1000', 5000, OutdoorStatus.ATIVO),
    new Outdoor('2', 'João Silva', '6x3m', 'Impresso', 'Rua Augusta, 500', 3000, OutdoorStatus.EM_PRODUCAO)
  ];

  constructor() {
    this.loadOutdoors();
  }

  listarOutdoors(): Outdoor[] {
    return [...this.outdoors];
  }

  listarOutdoorsPorUsuario(nomeCliente: string): Outdoor[] {
    return this.outdoors.filter(outdoor => outdoor.cliente === nomeCliente);
  }

  criarOutdoor(outdoor: Outdoor): void {
    this.outdoors.push(outdoor);
    this.saveOutdoors();
  }

  atualizarStatus(id: string, novoStatus: OutdoorStatus, observacoes?: string): void {
    const outdoor = this.outdoors.find(o => o.id === id);
    if (outdoor) {
      outdoor.status = novoStatus;
      if (observacoes) {
        outdoor.observacoes = observacoes;
      }
      this.saveOutdoors();
    }
  }

  excluirOutdoor(id: string): void {
    this.outdoors = this.outdoors.filter(o => o.id !== id);
    this.saveOutdoors();
  }

  private saveOutdoors(): void {
    localStorage.setItem('outdoors', JSON.stringify(this.outdoors));
  }

  private loadOutdoors(): void {
    const data = localStorage.getItem('outdoors');
    if (data) {
      const outdoorsData = JSON.parse(data);
      this.outdoors = outdoorsData.map((o: any) => 
        new Outdoor(o.id, o.cliente, o.tamanho, o.tipo, o.localizacao, o.valor, o.status, o.observacoes, new Date(o.criadoEm))
      );
    }
  }
}
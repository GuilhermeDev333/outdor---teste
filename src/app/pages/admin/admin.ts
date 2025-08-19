import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { OutdoorService } from '../../services/outdoor';
import { Outdoor, OutdoorStatus } from '../../models/outdoor.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  outdoors: Outdoor[] = [];
  showForm: boolean = false;
  
  // Formulário
  cliente: string = '';
  tamanho: string = '9x3m';
  tipo: string = 'Digital';
  localizacao: string = '';
  valor: number = 0;

  constructor(
    private authService: AuthService,
    private outdoorService: OutdoorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.carregarOutdoors();
  }

  carregarOutdoors(): void {
    this.outdoors = this.outdoorService.listarOutdoors();
  }

  criarOutdoor(): void {
    const novoOutdoor = new Outdoor(
      Date.now().toString(),
      this.cliente,
      this.tamanho,
      this.tipo,
      this.localizacao,
      this.valor
    );
    
    this.outdoorService.criarOutdoor(novoOutdoor);
    this.carregarOutdoors();
    this.limparFormulario();
    this.showForm = false;
  }

  atualizarStatus(id: string, novoStatus: OutdoorStatus): void {
    this.outdoorService.atualizarStatus(id, novoStatus);
    this.carregarOutdoors();
  }

  excluirOutdoor(id: string): void {
    if (confirm('Tem certeza que deseja excluir este outdoor?')) {
      this.outdoorService.excluirOutdoor(id);
      this.carregarOutdoors();
    }
  }

  limparFormulario(): void {
    this.cliente = '';
    this.tamanho = '9x3m';
    this.tipo = 'Digital';
    this.localizacao = '';
    this.valor = 0;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
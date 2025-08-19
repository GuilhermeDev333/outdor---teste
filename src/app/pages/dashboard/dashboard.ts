import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { OutdoorService } from '../../services/outdoor';
import { Outdoor } from '../../models/outdoor.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  outdoors: Outdoor[] = [];
  nomeUsuario: string = '';

  constructor(
    private authService: AuthService,
    private outdoorService: OutdoorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.nomeUsuario = user.nome;
    this.carregarOutdoors();
  }

  carregarOutdoors(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.outdoors = this.outdoorService.listarOutdoorsPorUsuario(user.nome);
    }
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'planejado': '#f59e0b',
      'em_producao': '#3b82f6',
      'producao_concluida': '#8b5cf6',
      'em_instalacao': '#f97316',
      'ativo': '#10b981',
      'manutencao': '#ef4444',
      'inativo': '#6b7280'
    };
    return colors[status] || '#6b7280';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'planejado': 'Planejado',
      'em_producao': 'Em Produção',
      'producao_concluida': 'Produção Concluída',
      'em_instalacao': 'Em Instalação',
      'ativo': 'Ativo',
      'manutencao': 'Manutenção',
      'inativo': 'Inativo'
    };
    return labels[status] || status;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
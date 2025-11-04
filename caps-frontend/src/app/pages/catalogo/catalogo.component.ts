import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  imports: [CommonModule, RouterModule]
})
export class CatalogoComponent implements OnInit {
  productos: any[] = [];
  carritoCount: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });

    this.cartService.carritoCount$.subscribe(count => {
      this.carritoCount = count;
    });
  }

  agregarAlCarrito(producto: any): void {
    this.cartService.agregarProducto(producto);
  }
}

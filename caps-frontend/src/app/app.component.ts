import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  carritoCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.carritoCount$.subscribe((count) => {
      this.carritoCount = count;
    });
  }
}


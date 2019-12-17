// Angular Module
import { NgModule } from '@angular/core';

// Angular Materials Module
import { MatMenuModule, MatIconModule, MatCardModule, MatButtonModule,
          MatExpansionModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
          MatSnackBarModule } from '@angular/material';

@NgModule({
  exports: [
    MatMenuModule, 
    MatIconModule, 
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class AngularMaterialsModule { }

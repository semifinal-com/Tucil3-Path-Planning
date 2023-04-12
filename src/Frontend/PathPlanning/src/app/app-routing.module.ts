import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: '', component: TestComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

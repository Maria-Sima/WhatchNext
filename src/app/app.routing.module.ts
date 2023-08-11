import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {RecommandationsComponent} from "./pages/recommandations/recommandations.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'search', component: RecommandationsComponent, data: { breadcrumb: 'Search' } },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

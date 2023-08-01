import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {RecommandationsComponent} from "./pages/recommandations/recommandations.component";

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {path:'search', component:RecommandationsComponent,data:{breadcrumb: 'Search'}}
]

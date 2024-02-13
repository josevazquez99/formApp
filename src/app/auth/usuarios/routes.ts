import { Routes } from "@angular/router";
import { ListadoUsuariosComponent } from "./listado-usuarios/listado-usuarios.component";
import { ManageUserComponent } from "./manage-user/manage-user.component";

export const routerU : Routes = [
    {path: "list",component:ListadoUsuariosComponent},
    {path: "manageUser/:id",component:ManageUserComponent}
]
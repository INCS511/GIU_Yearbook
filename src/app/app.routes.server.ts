import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // /students/3 and /students/7 are different pages made from one route.
  // The build cannot prerender them without a list of every id, so the
  // server builds these pages when somebody asks for them.
  {
    path: 'students/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

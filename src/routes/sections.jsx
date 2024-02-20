import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <IndexPage /> },
        { path: 'products', element: <IndexPage /> },
        { path: 'blog', element: <IndexPage /> },
        {
          path: '*',
          element: <IndexPage />,
        },
      ],
    },
  ]);

  return routes;
}

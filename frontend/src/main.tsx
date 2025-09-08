
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import NotFound from './NotFound.tsx';
import Home from './pages/Home.tsx';
import PostDetail from './pages/posts/PostDetail.tsx';
import PostList from './pages/posts/PostList.tsx';
import './index.css';
import UserList from './pages/users/UserList.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'users', element: <UserList /> },
      { path: 'posts', element: <PostList /> },
      { path: '*', element: <NotFound /> },
      {path: 'posts/:id', element: <PostDetail /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

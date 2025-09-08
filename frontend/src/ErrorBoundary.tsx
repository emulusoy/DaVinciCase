import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();
  let message = 'Beklenmeyen bir hata oluştu.';
  if (isRouteErrorResponse(error)) message = `${error.status} ${error.statusText}`;
  else if (error instanceof Error) message = error.message;

  return (
    <main className="container" role="alert">
      <h2>Hata</h2>
      <p>{message}</p>
    </main>
  );
}

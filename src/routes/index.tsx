import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalhePessoas, ListagemPessoas } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página inicial',
        path: '/dashboard',
        icon: 'home'
      },
      {
        label: 'Pessoas',
        path: '/pessoas',
        icon: 'people'

      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemPessoas />} />

      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoas />} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>

  );
};
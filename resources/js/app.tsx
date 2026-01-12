import './bootstrap';
import '../css/app.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CityDetails from './pages/CityDetails';
import CityList from './pages/CityList'; // <--- Novo import
import CityForm from './pages/CityForm';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* Rota da Home (Lista de Cidades) */}
                    <Route path="/" element={<CityList />} />
                    
                    {/* Rota de Detalhes */}
                    <Route path="/cities/:id" element={<CityDetails />} />
                    <Route path="/admin/create" element={<CityForm />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
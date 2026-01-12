import './bootstrap';
import '../css/app.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider'; // <--- Importe aqui

import CityList from './pages/CityList';
import CityDetails from './pages/CityDetails';
import CityForm from './pages/CityForm';
import CityEdit from './pages/CityEdit';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* Adicione o ThemeProvider aqui em volta de tudo */}
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<CityList />} />
                        <Route path="/cities/:id" element={<CityDetails />} />
                        <Route path="/admin/create" element={<CityForm />} />
                        <Route path="/admin/edit/:id" element={<CityEdit />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
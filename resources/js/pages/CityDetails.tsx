import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define a "cara" dos dados que vêm da API
interface City {
    id: number;
    name: string;
    short_description: string;
    full_description: string;
    image_url: string;
    category: string;
}

// Função que vai lá no Back-End buscar os dados
const fetchCity = async () => {
    const response = await axios.get('/api/cities/1');
    return response.data.data;
};

export default function CityDetails() {
    // Busca os dados automaticamente
    const { data: city, isLoading, isError } = useQuery<City>({
        queryKey: ['city', 1],
        queryFn: fetchCity,
    });

    if (isLoading) return <div className="text-center p-10">Carregando informações de Minaçu...</div>;
    if (isError) return <div className="text-center p-10 text-red-500">Erro ao carregar os dados.</div>;

    return (
        <div className="font-sans">
            {/* Cabeçalho com a Foto */}
            <div className="relative w-full h-96">
                <img 
                    src={city?.image_url} 
                    alt={city?.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-6xl font-bold text-white tracking-wider">{city?.name}</h1>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="max-w-4xl mx-auto p-8 text-center">
                {/* Descrição Curta (Negrito) */}
                <p className="text-xl font-semibold text-gray-800 mb-6">
                    {city?.short_description}
                </p>

                {/* Descrição Longa */}
                <p className="text-lg text-gray-600 leading-relaxed mb-10 text-justify">
                    {city?.full_description}
                </p>

                {/* Botão */}
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Quero Conhecer
                </button>
            </div>
            
            {/* Rodapé simples igual ao PDF */}
            <footer className="bg-gray-100 text-center p-4 mt-10 text-gray-500 text-sm">
                Turismo Norte-Goiano • Todos os Direitos Reservados
            </footer>
        </div>
    );
}
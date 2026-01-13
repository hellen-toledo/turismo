import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface City {
    id: number;
    name: string;
    full_description: string;
    image_url: string;
    category: string;
}

const fetchCity = async (id: string) => {
    // Busca os dados da cidade específica pelo ID
    const response = await axios.get(`/api/cities/${id}`);
    return response.data.data;
};

export default function CityDetails() {
    // 1. Pega o ID que está na URL (ex: /cities/5)
    const { id } = useParams<{ id: string }>();

    // 2. Busca os dados no banco usando esse ID
    const { data: city, isLoading, isError } = useQuery<City>({
        queryKey: ['city', id],
        queryFn: () => fetchCity(id!),
        enabled: !!id, // Só busca se tiver ID
    });

    if (isLoading) return <div className="text-center p-20 text-gray-500">Carregando informações...</div>;
    if (isError || !city) return <div className="text-center p-20 text-red-500">Cidade não encontrada.</div>;

    return (
        <div className="font-sans bg-white min-h-screen pb-12">
            
            {/* Cabeçalho com Imagem de Fundo (Hero Section) */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <img 
                    src={city.image_url} 
                    alt={city.name} 
                    className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                    <span className="bg-orange-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                        {city.category || 'Turismo'}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center drop-shadow-lg">
                        {city.name}
                    </h1>
                </div>
            </div>

            {/* Conteúdo do Texto */}
            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
                <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-2xl">
                    
                    {/* Botão de Voltar */}
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-500 mb-8 transition-colors">
                        ← Voltar para Destinos
                    </Link>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sobre o destino</h3>
                        
                        {/* Aqui vai o texto completo da cidade (permite quebras de linha) */}
                        <p className="whitespace-pre-line">
                            {city.full_description}
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                            ID do destino: #{city.id}
                        </div>
                        <Link 
                            to="/" 
                            className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 font-medium"
                        >
                            Ver outras cidades
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
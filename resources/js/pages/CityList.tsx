import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface City {
    id: number;
    name: string;
    short_description: string;
    image_url: string;
}

const fetchCities = async () => {
    // Busca a lista de todas as cidades na API
    const response = await axios.get('/api/cities');
    return response.data.data;
};

export default function CityList() {
    const { data: cities, isLoading, isError } = useQuery<City[]>({
        queryKey: ['cities'],
        queryFn: fetchCities,
    });

    if (isLoading) return <div className="text-center p-10">Carregando destinos...</div>;
    if (isError) return <div className="text-center p-10 text-red-500">Erro ao carregar cidades.</div>;

    return (
        <div className="font-sans bg-gray-50 min-h-screen">
            {/* Cabeçalho inspirado no PDF */}
            <header className="bg-white shadow-sm py-8 mb-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Turismo Norte-Goiano</h1>
                    <p className="text-gray-600 text-lg">Venha Conhecer Nossas Cidades</p>
                </div>
            </header>

            {/* Grade de Cidades */}
            <main className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cities?.map((city) => (
                        <div key={city.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* Imagem do Card */}
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={city.image_url} 
                                    alt={city.name} 
                                    className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                                />
                            </div>
                            
                            {/* Conteúdo do Card */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{city.name}</h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {city.short_description}
                                </p>
                                
                                {/* Botão que leva para a página de detalhes */}
                                <Link 
                                    to={`/cities/${city.id}`} 
                                    className="inline-block bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition duration-300"
                                >
                                    Conhecer
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
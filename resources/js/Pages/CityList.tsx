import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Pencil, Trash2, MapPin, Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider'; 
import { Link, router } from '@inertiajs/react';

interface City {
    id: number;
    name: string;
    short_description: string;
    image_url: string;
}

const fetchCities = async () => {
    const response = await axios.get('/api/cities');
    return response.data.data;
};

export default function CityList() {
    const queryClient = useQueryClient();
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const { data: cities, isLoading, isError } = useQuery<City[]>({
        queryKey: ['cities'],
        queryFn: fetchCities,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`/api/cities/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cities'] });
        }
    });

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        if (confirm('Tem certeza que deseja excluir esta cidade?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:bg-[#09090b] dark:text-white bg-gray-50 text-gray-900">Carregando...</div>;
    if (isError) return <div className="min-h-screen flex items-center justify-center dark:bg-[#09090b] text-red-500 bg-gray-50">Erro ao carregar.</div>;

    return (
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-[#09090b] dark:text-white font-sans">
            
           
            <nav className="border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tight">
                        Turismo <span className="text-green-600 dark:text-green-500">Norte-Goiano</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-zinc-400">
                        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                        <Link href="/admin/events" className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Eventos</Link>
                        <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Guia</span>
                        <span className="text-black dark:text-white border-b-2 border-green-500 pb-1">Cidades</span>
                    </div>

                    <div className="flex items-center gap-4">
                        
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-200 text-gray-800 dark:bg-zinc-800 dark:text-yellow-400 hover:scale-110 transition-transform"
                            title="Mudar Tema"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        
                        <Link 
                            href="/logout" 
                            method="post" 
                            as="button" 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition shadow-md text-sm"
                        >
                            Sair
                        </Link>

                        <Link href="/admin/create" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md">
                            <Plus size={16} />
                            NOVA CIDADE
                        </Link>
                    </div>
                </div>
            </nav>

           
            <header className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white transition-colors">
                    Cidades
                </h1>
                <p className="text-gray-500 dark:text-zinc-400 text-lg md:text-xl font-light">
                    Norte Goiano: Venha Conhecer Nossas Cidades
                </p>
            </header>

            <main className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cities?.map((city) => (
                        <div key={city.id} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg dark:shadow-black/50 border border-gray-200 dark:border-white/5 bg-white dark:bg-zinc-900 transition-all">
                            
                            <img 
                                src={city.image_url} 
                                alt={city.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 dark:opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
                                    <MapPin size={12} />
                                    Destino
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                    {city.name}
                                </h2>
                                <p className="text-gray-200 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium">
                                    {city.short_description}
                                </p>
                            </div>

                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-20">
                                <Link 
                                    href={`/admin/edit/${city.id}`}
                                    className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-black transition-all border border-white/30"
                                    title="Editar"
                                >
                                    <Pencil size={18} />
                                </Link>

                                <button 
                                    onClick={(e) => handleDelete(e, city.id)}
                                    className="bg-red-500/20 backdrop-blur-md text-red-500 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all border border-red-500/30"
                                    title="Excluir"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <Link href={`/cities/${city.id}`} className="absolute inset-0 z-10" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
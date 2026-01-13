import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import { Sun, Moon, MapPin, ArrowRight, UserCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

interface City {
    id: number;
    name: string;
    short_description: string;
    image_url: string;
}

// Busca as cidades no banco de dados
const fetchCities = async () => {
    const response = await axios.get('/api/cities');
    return response.data.data;
};

export default function Home() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    const { data: cities, isLoading } = useQuery<City[]>({
        queryKey: ['public_cities'],
        queryFn: fetchCities,
    });

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-[#09090b] dark:text-white font-sans">
            
            {/* --- CABEÇALHO (Navbar) --- */}
            <nav className="border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    
                    {/* Logo */}
                    <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="text-green-600" />
                        <span>Turismo <span className="text-green-600">Norte-Goiano</span></span>
                    </div>

                    {/* Botões da Direita */}
                    <div className="flex items-center gap-6">
                        {/* Botão de Tema */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                            title="Alternar Tema"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* LINK PARA LOGIN */}
                        <Link 
                            href="/login" 
                            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-500 transition-colors"
                        >
                            <UserCircle size={18} />
                            Área Restrita
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION (Banner) --- */}
            <header className="bg-green-600 dark:bg-green-700 py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Descubra Nossas Cidades
                    </h1>
                    <p className="text-green-100 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        História, natureza e as águas do Lago Serra da Mesa esperam por você. 
                        Venha explorar o melhor do norte de Goiás.
                    </p>
                </div>
            </header>

            {/* --- LISTA DE CIDADES --- */}
            <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
                
                {isLoading ? (
                    <div className="text-center py-20 text-gray-500">Carregando maravilhas...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cities?.map((city) => (
                            <div key={city.id} className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-800">
                                {/* Imagem */}
                                <div className="h-64 overflow-hidden relative">
                                    <img 
                                        src={city.image_url} 
                                        alt={city.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                
                                {/* Conteúdo do Card */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                                        {city.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                                        {city.short_description}
                                    </p>
                                    
                                    <button className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all">
                                        Conhecer <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* --- RODAPÉ --- */}
            <footer className="bg-gray-100 dark:bg-black/30 py-8 text-center text-gray-500 text-sm">
                <p>&copy; 2024 Turismo Norte-Goiano. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
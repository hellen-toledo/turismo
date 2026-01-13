import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, Plus, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider'; 

export default function EventList() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return (
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-[#09090b] dark:text-white font-sans">
            
            {/* --- NAVEGAÇÃO --- */}
            <nav className="border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tight">
                        Turismo <span className="text-green-600 dark:text-green-500">Norte-Goiano</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-zinc-400">
                        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                        {/* Botão ativo nesta página */}
                        <span className="text-black dark:text-white border-b-2 border-green-500 pb-1 cursor-default">Eventos</span>
                        <span className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Guia</span>
                        <Link href="/admin" className="hover:text-black dark:hover:text-white transition-colors">Cidades</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-zinc-800">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link href="/logout" method="post" as="button" className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                            Sair
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- CONTEÚDO --- */}
            <main className="max-w-7xl mx-auto px-6 py-20 text-center">
                <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-800">
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                            <Calendar className="w-12 h-12 text-green-600 dark:text-green-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Gerenciamento de Eventos</h1>
                    <p className="text-gray-500 dark:text-zinc-400 mb-8">
                        Esta funcionalidade será implementada em breve. Aqui você poderá cadastrar festas e festivais.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all">
                        <Plus size={20} />
                        Criar Novo Evento
                    </button>
                </div>
            </main>
        </div>
    );
}
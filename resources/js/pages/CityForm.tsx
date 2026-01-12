import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CityForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        full_description: '',
        image_url: '',
        category: 'Natureza' // Valor padrão
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/cities', formData);
            alert('Cidade cadastrada com sucesso!');
            navigate('/'); // Volta para a home
        } catch (error) {
            alert('Erro ao cadastrar. Verifique os dados.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Nova Cidade</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Nome */}
                <div>
                    <label className="block text-gray-700">Nome da Cidade</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>

                {/* Descrição Curta */}
                <div>
                    <label className="block text-gray-700">Resumo (aparece no card)</label>
                    <input type="text" name="short_description" value={formData.short_description} onChange={handleChange} required 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>

                {/* Imagem URL */}
                <div>
                    <label className="block text-gray-700">Link da Imagem (URL)</label>
                    <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} required placeholder="https://..."
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>

                {/* Categoria */}
                <div>
                    <label className="block text-gray-700">Categoria</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="Natureza">Natureza</option>
                        <option value="Histórico">Histórico</option>
                        <option value="Gastronomia">Gastronomia</option>
                    </select>
                </div>

                {/* Descrição Longa */}
                <div>
                    <label className="block text-gray-700">Descrição Completa</label>
                    <textarea name="full_description" value={formData.full_description} onChange={handleChange} required rows={4}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"></textarea>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">
                    Salvar Cidade
                </button>
            </form>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function CityEdit() {
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    
    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        full_description: '',
        image_url: '',
        category: 'Natureza'
    });

    // Ao abrir a tela, busca os dados atuais da cidade
    useEffect(() => {
        axios.get(`/api/cities/${id}`).then((response) => {
            const city = response.data.data;
            setFormData({
                name: city.name,
                short_description: city.short_description,
                full_description: city.full_description,
                image_url: city.image_url,
                category: city.category
            });
            setIsLoading(false);
        });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Envia a atualização (PUT)
            await axios.put(`/api/cities/${id}`, formData);
            alert('Cidade atualizada com sucesso!');
            navigate('/'); 
        } catch (error) {
            alert('Erro ao atualizar.');
        }
    };

    if (isLoading) return <div className="p-10 text-center">Carregando dados...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Editar Cidade</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nome</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Resumo</label>
                    <input type="text" name="short_description" value={formData.short_description} onChange={handleChange} required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Imagem URL</label>
                    <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} required className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Categoria</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="Natureza">Natureza</option>
                        <option value="Histórico">Histórico</option>
                        <option value="Gastronomia">Gastronomia</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Descrição Completa</label>
                    <textarea name="full_description" value={formData.full_description} onChange={handleChange} required rows={4} className="w-full p-2 border rounded"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}
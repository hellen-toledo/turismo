<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Http\Resources\CityResource;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::all();
        return CityResource::collection($cities);
    }

    public function show($id)
    {
        $city = City::findOrFail($id);
        return new CityResource($city);
    }

    // NOVA FUNÇÃO: Salvar cidade no banco
    public function store(Request $request)
    {
        // 1. Valida se os dados estão corretos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'full_description' => 'required|string',
            'image_url' => 'required|url',
            'category' => 'required|string',
        ]);

        // 2. Cria a cidade no banco
        $city = City::create($validated);

        // 3. Devolve a cidade criada como confirmação
        return new CityResource($city);
    }
    // Função para ATUALIZAR uma cidade
    public function update(Request $request, $id)
    {
        $city = City::findOrFail($id);
        
        // Valida os dados novos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'full_description' => 'required|string',
            'image_url' => 'required|url',
            'category' => 'required|string',
        ]);

        // Atualiza no banco
        $city->update($validated);

        return new CityResource($city);
    }
    // Função para APAGAR uma cidade
    public function destroy($id)
    {
        $city = City::findOrFail($id);
        $city->delete();
        
        return response()->json(['message' => 'Cidade removida com sucesso']);
    }
}
<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        City::create([
            'name' => 'Minaçu',
            'short_description' => 'Com uma localização privilegiada às margens do grandioso Lago Serra da Mesa, Minaçu se revela como um destino de tranquilidade e lazer.',
            'full_description' => 'A cidade oferece o cenário perfeito para quem busca a pesca esportiva, passeios náuticos e o relaxamento em suas praias de água doce, como a Praia do Sol.',
            'image_url' => 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
            'category' => 'Polo de Desenvolvimento'
        ]);
    }
}
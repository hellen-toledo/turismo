<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome da cidade
            $table->string('short_description'); // Descrição curta
            $table->text('full_description'); // Descrição longa
            $table->string('image_url'); // Link da imagem
            $table->string('category'); // Categoria
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    // Liberamos estes campos para serem preenchidos
    protected $fillable = [
        'name',
        'short_description',
        'full_description',
        'image_url',
        'category'
    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'utilisateurs';
    protected $primaryKey = 'id_utilisateur';

    protected $fillable = [
        'nom_utilisateur',
        'prenom_utilisateur',
        'email',
        'password',
        'date_naissance',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'email_verified_at' => 'datetime',
    ];

    // Définir le rôle par défaut
    protected $attributes = [
        'role' => 'Visiteur',
    ];
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur
     */
    public function register(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:100',
            'nom' => 'required|string|max:100',
            'dateNaissance' => 'required|date|before:today',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email',
            'motDePasse' => 'required|string|min:6|confirmed',
            'motDePasse_confirmation' => 'required|string|min:6',
        ], [
            'prenom.required' => 'Le prénom est requis',
            'nom.required' => 'Le nom est requis',
            'dateNaissance.required' => 'La date de naissance est requise',
            'dateNaissance.before' => 'La date de naissance doit être antérieure à aujourd\'hui',
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email n\'est pas valide',
            'email.unique' => 'Cet email est déjà utilisé',
            'motDePasse.required' => 'Le mot de passe est requis',
            'motDePasse.min' => 'Le mot de passe doit contenir au moins 6 caractères',
            'motDePasse.confirmed' => 'Les mots de passe ne correspondent pas',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Créer l'utilisateur
            $utilisateur = Utilisateur::create([
                'nom_utilisateur' => $request->nom,
                'prenom_utilisateur' => $request->prenom,
                'email' => $request->email,
                'password' => Hash::make($request->motDePasse),
                'date_naissance' => $request->dateNaissance,
                'role' => 'Visiteur', // Rôle par défaut
            ]);

            // Créer un token d'authentification
            $token = $utilisateur->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Inscription réussie !',
                'data' => [
                    'utilisateur' => [
                        'id' => $utilisateur->id_utilisateur,
                        'nom' => $utilisateur->nom_utilisateur,
                        'prenom' => $utilisateur->prenom_utilisateur,
                        'email' => $utilisateur->email,
                        'role' => $utilisateur->role,
                    ],
                    'token' => $token,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Connexion d'un utilisateur
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ], [
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email n\'est pas valide',
            'password.required' => 'Le mot de passe est requis',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $utilisateur = Utilisateur::where('email', $request->email)->first();

        if (!$utilisateur || !Hash::check($request->password, $utilisateur->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        // Supprimer les anciens tokens
        $utilisateur->tokens()->delete();

        // Créer un nouveau token
        $token = $utilisateur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'data' => [
                'utilisateur' => [
                    'id' => $utilisateur->id_utilisateur,
                    'nom' => $utilisateur->nom_utilisateur,
                    'prenom' => $utilisateur->prenom_utilisateur,
                    'email' => $utilisateur->email,
                    'role' => $utilisateur->role,
                ],
                'token' => $token,
            ]
        ], 200);
    }

    /**
     * Déconnexion
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ], 200);
    }

    /**
     * Obtenir l'utilisateur connecté
     */
    public function user(Request $request)
    {
        $utilisateur = $request->user();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $utilisateur->id_utilisateur,
                'nom' => $utilisateur->nom_utilisateur,
                'prenom' => $utilisateur->prenom_utilisateur,
                'email' => $utilisateur->email,
                'role' => $utilisateur->role,
                'date_naissance' => $utilisateur->date_naissance,
            ]
        ], 200);
    }
}
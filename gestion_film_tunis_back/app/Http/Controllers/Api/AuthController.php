<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validation des données reçues
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'dateNaissance' => 'required|date',
            'email' => 'required|string|email|max:255|unique:users',
            'motDePasse' => 'required|string|min:6|confirmed',
        ], [
            'motDePasse.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'email.unique' => 'Cet email est déjà utilisé.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                'prenom' => $request->prenom,
                'nom' => $request->nom,
                'dateNaissance' => $request->dateNaissance,
                'email' => $request->email,
                'password' => Hash::make($request->motDePasse),
                'role' => 'visiteur',
            ]);

            // Génération d’un token (optionnel, si vous utilisez Sanctum)
            $token = $user->createToken('auth_token')->plainTextToken ?? null;

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur créé avec succès',
                'data' => [
                    'utilisateur' => $user,
                    'token' => $token
                ]
            ]);
        } catch (QueryException $ex) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur base de données : ' . $ex->getMessage()
            ], 500);
        } catch (\Exception $ex) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur serveur : ' . $ex->getMessage()
            ], 500);
        }
    }
}

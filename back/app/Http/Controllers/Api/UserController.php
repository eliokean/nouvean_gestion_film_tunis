<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::all();
        return response()->json($users);
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|string|in:Visiteur,Responsable_Production,Responsable_Inspection,President_du_Jury,Jury',
        ]);

        $user->role = $validated['role'];
        $user->save();

        return response()->json($user);
    }
}

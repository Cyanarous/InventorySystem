<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' =>$data['password'],
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }


    public function login(LoginRequest $request) {
        $data = $request->validated();

        // Find user by email
        $user = User::where('email', $data['email'])->first();

        // Check if user exists and password matches
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response([
                'message' => 'Provide a valid email address or the password is incorrect'
            ], 422);
        }

    // Create token
    $token = $user->createToken('main')->plainTextToken;

    // Return user and token
    return response(compact('user', 'token'));
}


    public function logout($request){
        $user = $request->user();
        $user->tokens()->delete();

        return response([
            'message' => 'Logged out successfully'
        ], 204);
    }
}

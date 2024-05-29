<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users',
            'password' => 'required',
            'name' => 'required',
            'role' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $data = $request->all();


        $userData = array_merge($data, ['role' => $data['role'] ?? 'user']);

        $resp['user'] = User::create($userData);
        $resp['token'] = $resp['user']->createToken('my-token')->plainTextToken;

        return $this->sendResponse($resp);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $fields = $request->all();

        $user = User::where('email', $fields['email'])->first();


        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return $this->sendError('Wrong user or password', [], 401);
        }

        $token = $user->createToken('my-token')->plainTextToken;

        $resp = [
            'token' => $token,
            'Type' => 'Bearer',
            'user' => $user
        ];
        return $this->sendResponse($resp);
    }

    public function me(Request $request) {
        return $this->sendResponse($request->user());
    }
}

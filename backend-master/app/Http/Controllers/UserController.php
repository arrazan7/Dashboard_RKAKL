<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use function Laravel\Prompts\password;

class UserController extends BaseController
{

    public function getUsers(Request $request) {
        $users = User::all();

        $currentPage = request('page', 1);
        $perPage = request('perPage', 10);


        $collection = new Collection($users);

        $paginatedData = new LengthAwarePaginator(
            $collection->forPage($currentPage, $perPage),
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => url($request->path())]
        );
        return $this->sendResponse($paginatedData);
    }

    public function createUser(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users',
            'password' => 'required',
            'name' => 'required',
            'role' => 'in:admin,user',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $data = $request->all();
        $userData = array_merge($data, ['role' => $data['role'] ?? 'user']);

        $resp['user'] = User::create($userData);

        return $this->sendResponse($resp);
    }

    public function editUser(Request $request, string $userID) {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => '',
            'name' => 'required',
            'role' => 'in:admin,user',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $data = $request->all();

        $user = User::where('id', $userID)->first();

        $user->email = $data['email'];
        $user->name = $data['name'];
        $user->role = $data['role'];

        if (!is_null($data['password'])) {
            $user->password = $data['password'];
        }

        $user->save();

        return $this->sendResponse($user);
    }

    public function getUser(Request $request, string $userID) {
        $user = User::where('id', $userID)->first();

        return $this->sendResponse($user);
    }

    public function deleteUser(Request $request, string $userID) {
        $user = User::where('id', $userID)->delete();

        return $this->sendResponse([], 'Delete success');
    }
}

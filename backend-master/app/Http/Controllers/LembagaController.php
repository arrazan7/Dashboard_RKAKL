<?php

namespace App\Http\Controllers;

use App\Models\Lembaga;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class LembagaController extends BaseController
{
    public function createLembaga(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|unique:lembaga',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', 400);
        }

        $lembaga = new Lembaga;
        $lembaga->code = $request->code;
        $lembaga->name = $request->name;

        $lembaga->save();
        return $this->sendResponse($lembaga);
    }

    public function editLembaga(Request $request, string $lembagaID)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|unique:lembaga',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', 400);
        }

        $lembaga = Lembaga::where('id', $lembagaID)->first();

        $lembaga->code = $request->code;
        $lembaga->name = $request->name;

        $lembaga->save();
        return $this->sendResponse($lembaga);
    }

    public function getLembagas(Request $request)
    {
        $lembaga = Lembaga::all();

        $currentPage = request('page', 1);
        $perPage = request('perPage', 10);


        $collection = new Collection($lembaga);

        $paginatedData = new LengthAwarePaginator(
            $collection->forPage($currentPage, $perPage),
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => url($request->path())]
        );
        return $this->sendResponse($paginatedData);
    }

    public function getLembaga(Request $request, string $lembagaID)
    {
        $lembaga = Lembaga::where('id', $lembagaID)->first();;
        return $this->sendResponse($lembaga);
    }

    public function deleteLembaga(Request $request, string $id)
    {
        $user = Lembaga::where('id', $id)->delete();
        return $this->sendResponse([], 'Delete success');
    }
}

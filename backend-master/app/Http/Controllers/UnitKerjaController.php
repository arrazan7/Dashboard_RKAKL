<?php

namespace App\Http\Controllers;

use App\Models\Lembaga;
use App\Models\UnitKerja;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class UnitKerjaController extends BaseController
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|unique:unit_kerja',
            'name' => 'required',
            'unitOrganisasiCode' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $unitkerja = new UnitKerja();
        $unitkerja->code = $request->code;
        $unitkerja->name = $request->name;
        $unitkerja->unit_organisasi_code = $request->unitOrganisasiCode;

        $unitkerja->save();
        return $this->sendResponse($unitkerja);
    }

    public function edit(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'name' => 'required',
            'unitOrganisasiCode' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $unitKerja = UnitKerja::where('id', $id)->first();

        $unitKerja->code = $request->code;
        $unitKerja->name = $request->name;
        $unitKerja->unit_organisasi_code = $request->unitOrganisasiCode;


        $unitKerja->save();
        return $this->sendResponse($unitKerja);
    }


    public function getAll(Request $request)
    {
        $unitKerja = UnitKerja::all();

        $currentPage = request('page', 1);
        $perPage = request('perPage', 10);


        $collection = new Collection($unitKerja);

        $paginatedData = new LengthAwarePaginator(
            $collection->forPage($currentPage, $perPage),
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => url($request->path())]
        );
        return $this->sendResponse($paginatedData);
    }

    public function getUnitKerja(Request $request, string $ukID)
    {
        $unitKerja = UnitKerja::where('id', $ukID)->first();;
        return $this->sendResponse($unitKerja);
    }

    public function delete(Request $request, string $id)
    {
        $user = UnitKerja::where('id', $id)->delete();
        return $this->sendResponse([], 'Delete success');
    }
}

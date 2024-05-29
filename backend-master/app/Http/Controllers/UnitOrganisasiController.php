<?php

namespace App\Http\Controllers;

use App\Models\UnitKerja;
use App\Models\UnitOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class UnitOrganisasiController extends BaseController
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|unique:unit_organisasi',
            'name' => 'required',
            'lembagaCode' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $unitkerja = new UnitOrganisasi();
        $unitkerja->code = $request->code;
        $unitkerja->name = $request->name;
        $unitkerja->lembaga_code = $request->lembagaCode;

        $unitkerja->save();
        return $this->sendResponse($unitkerja);
    }

    public function edit(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required',
            'name' => 'required',
            'lembagaCode' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $unitKerja = UnitOrganisasi::where('id', $id)->first();

        $unitKerja->code = $request->code;
        $unitKerja->name = $request->name;
        $unitKerja->lembaga_code = $request->lembagaCode;


        $unitKerja->save();
        return $this->sendResponse($unitKerja);
    }


    public function getAll(Request $request)
    {
        $unitOrganisasi = UnitOrganisasi::all();

        $currentPage = request('page', 1);
        $perPage = request('perPage', 10);


        $collection = new Collection($unitOrganisasi);

        $paginatedData = new LengthAwarePaginator(
            $collection->forPage($currentPage, $perPage),
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => url($request->path())]
        );
        return $this->sendResponse($paginatedData);
    }

    public function getUnitOrganisasi(Request $request, string $uoID)
    {
        $unitOrganisasi = UnitOrganisasi::where('id', $uoID)->first();;
        return $this->sendResponse($unitOrganisasi);
    }

    public function delete(Request $request, string $id)
    {
        $user = UnitOrganisasi::where('id', $id)->delete();
        return $this->sendResponse([], 'Delete success');
    }
}

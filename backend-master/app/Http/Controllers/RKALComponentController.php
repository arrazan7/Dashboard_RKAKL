<?php

namespace App\Http\Controllers;

use App\Models\RKAKLComponent;
use App\Models\UnitKerja;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class RKALComponentController extends BaseController
{
    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'parentIode' => '',
            'code' => 'required|unique:rkakl_components',
            'name' => 'required',
            'type' => 'required|in:program,kegiatan,kro,ro,komponen,sub-komponen,detail,sub-detail',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $component = new RKAKLComponent();
        $component->code = $request->code;
        $component->name = $request->name;
        $component->type = $request->type;
        $component->parent_code = $request->parentCode;

        $component->save();
        return $this->sendResponse($component);

    }

    public function edit(Request $request, string $id) {
        $validator = Validator::make($request->all(), [
            'parentCode' => '',
            'code' => 'required',
            'name' => 'required',
            'type' => 'required|in:program,kegiatan,kro,ro,komponen,sub-komponen,detail,sub-detail',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $component = RKAKLComponent::where('id', $id)->first();

        if (is_null($component)) {
            return $this->sendError('Not found error', $validator->errors(), 404);
        }

        $component->code = $request->code;
        $component->name = $request->name;
        $component->type = $request->type;
        $component->parent_code = $request->parentCode;


        $component->save();
        return $this->sendResponse($component);

    }


    public function getAll(Request $request) {
        $component = RKAKLComponent::all();

        if (!empty($request->type)) {
            $component = $component->where('type', '=', $request->type);
        }

        $currentPage = request('page', 1);
        $perPage = request('perPage', 10);


        $collection = new Collection($component);

        $paginatedData = new LengthAwarePaginator(
            $collection->forPage($currentPage, $perPage),
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => url($request->path())]
        );
        return $this->sendResponse($paginatedData);
    }

    public function delete(Request $request, string $id) {
        $component = RKAKLComponent::where('id', $id)->delete();
        return $this->sendResponse([], 'Delete success');
    }
}

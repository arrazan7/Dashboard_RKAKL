<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/auth/me', [AuthController::class, 'me']);

    Route::get('/user', [\App\Http\Controllers\UserController::class, 'getUsers'])->middleware('restrictRole:admin');
    Route::get('/user/{userID}', [\App\Http\Controllers\UserController::class, 'getUser'])->middleware('restrictRole:admin');
    Route::post('/user/create', [\App\Http\Controllers\UserController::class, 'createUser'])->middleware('restrictRole:admin');
    Route::put('/user/edit/{userID}', [\App\Http\Controllers\UserController::class, 'editUser'])->middleware('restrictRole:admin');
    Route::delete('/user/delete/{userID}', [\App\Http\Controllers\UserController::class, 'deleteUser'])->middleware('restrictRole:admin');

    Route::get('/lembaga', [\App\Http\Controllers\LembagaController::class, 'getLembagas'])->middleware('restrictRole:admin,user');
    Route::get('/lembaga/{lembagaID}', [\App\Http\Controllers\LembagaController::class, 'getLembaga'])->middleware('restrictRole:admin,user');
    Route::post('/lembaga/create', [\App\Http\Controllers\LembagaController::class, 'createLembaga'])->middleware('restrictRole:admin');
    Route::put('/lembaga/edit/{lembagaID}', [\App\Http\Controllers\LembagaController::class, 'editLembaga'])->middleware('restrictRole:admin');
    Route::delete('/lembaga/delete/{lembagaID}', [\App\Http\Controllers\LembagaController::class, 'deleteLembaga'])->middleware('restrictRole:admin');

    Route::get('/unit-organisasi', [\App\Http\Controllers\UnitOrganisasiController::class, 'getAll'])->middleware('restrictRole:admin,user');
    Route::get('/unit-organisasi/{uoID}', [\App\Http\Controllers\UnitOrganisasiController::class, 'getUnitOrganisasi'])->middleware('restrictRole:admin,user');
    Route::post('/unit-organisasi/create', [\App\Http\Controllers\UnitOrganisasiController::class, 'create'])->middleware('restrictRole:admin');
    Route::put('/unit-organisasi/edit/{unitOrganisasiID}', [\App\Http\Controllers\UnitOrganisasiController::class, 'edit'])->middleware('restrictRole:admin');
    Route::delete('/unit-organisasi/delete/{unitOrganisasiID}', [\App\Http\Controllers\UnitOrganisasiController::class, 'delete'])->middleware('restrictRole:admin');

    Route::get('/unit-kerja', [\App\Http\Controllers\UnitKerjaController::class, 'getAll'])->middleware('restrictRole:admin,user');
    Route::get('/unit-kerja/{ukID}', [\App\Http\Controllers\UnitKerjaController::class, 'getUnitKerja'])->middleware('restrictRole:admin,user');
    Route::post('/unit-kerja/create', [\App\Http\Controllers\UnitKerjaController::class, 'create'])->middleware('restrictRole:admin');
    Route::put('/unit-kerja/edit/{unitOrganisasiID}', [\App\Http\Controllers\UnitKerjaController::class, 'edit'])->middleware('restrictRole:admin');
    Route::delete('/unit-kerja/delete/{unitOrganisasiID}', [\App\Http\Controllers\UnitKerjaController::class, 'delete'])->middleware('restrictRole:admin');

    Route::get('/rkakl/component', [\App\Http\Controllers\RKALComponentController::class, 'getAll'])->middleware('restrictRole:admin,user');
    Route::post('/rkakl/component/create', [\App\Http\Controllers\RKALComponentController::class, 'create'])->middleware('restrictRole:admin');
    Route::put('/rkakl/component/edit/{id}', [\App\Http\Controllers\RKALComponentController::class, 'edit'])->middleware('restrictRole:admin');
    Route::delete('/rkakl/component/delete/{id}', [\App\Http\Controllers\RKALComponentController::class, 'delete'])->middleware('restrictRole:admin');

    Route::post('/rkakl/document', [\App\Http\Controllers\RKAKLDocumentController::class, 'generate'])->middleware('restrictRole:admin,user');
    Route::get('/rkakl/document/{id}', [\App\Http\Controllers\RKAKLDocumentController::class, 'get'])->middleware('restrictRole:admin,user');
    Route::put('/rkakl/document/{id}/activate', [\App\Http\Controllers\RKAKLDocumentController::class, 'activate'])->middleware('restrictRole:admin,user');
    Route::post('/rkakl/document/create', [\App\Http\Controllers\RKAKLDocumentController::class, 'create'])->middleware('restrictRole:admin,user');
    Route::put('/rkakl/document/edit/{id}', [\App\Http\Controllers\RKAKLDocumentController::class, 'edit'])->middleware('restrictRole:admin,user');
    Route::get('/rkakl/document', [\App\Http\Controllers\RKAKLDocumentController::class, 'getAll'])->middleware('restrictRole:admin,user');
    Route::delete('/rkakl/document/delete/{id}', [\App\Http\Controllers\RKAKLDocumentController::class, 'delete'])->middleware('restrictRole:admin,user');
    Route::post('/rkakl/document/generate-summary', [\App\Http\Controllers\RKAKLDocumentController::class, 'generateSummary'])->middleware('restrictRole:admin,user');

    Route::get('/download/{filename}', [\App\Http\Controllers\DownloadController::class, 'downloadFile'])->middleware('restrictRole:admin,user');

});

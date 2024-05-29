<?php

namespace App\Http\Controllers;

use App\Http\Services\DataCleaningService;
use App\Http\Services\RKAKLDocumentService;
use App\Http\Services\TreeNode;
use App\Models\RKAKLDocument;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use League\CommonMark\Node\Block\Document;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use ricardoboss\Console;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class RKAKLDocumentController extends BaseController
{
    protected $dataCleaningService;
    protected $RKAKLDocumentService;

    public function __construct(DataCleaningService $dataCleaningService, RKAKLDocumentService $RKAKLDocumentService)
    {
        $this->dataCleaningService = $dataCleaningService;
        $this->RKAKLDocumentService = $RKAKLDocumentService;
    }

    public function generate(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx|max:15000',
        ]);

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $fileName, 'public');

        $cleanedData = $this->dataCleaningService->cleanData($file->path());

//        $cleanedData->printTree();

        $cleanedData->fillMasterData();

        $document = new RKAKLDocument();
        $document->lembaga_code = $request->lembagaCode;
        $document->unit_kerja_code = $request->unitKerjaCode;
        $document->unit_org_code = $request->unitOrganisasiCode;
        $document->version = 1;
        $document->is_active = false;
        $document->year = $request->year;
        $document->save();

        $this->RKAKLDocumentService->saveDocumentTree($cleanedData, $document->id, null);

        $response["document"] = $document;
        $response["documentData"] = $cleanedData->toArray();

        return $this->sendResponse($response);
    }

    public function delete(Request $request, $id) {
        $document = RKAKLDocument::where("id", "=", $id)->where('id', '=', $id)->delete();
        return $this->sendResponse([], 'Delete success');
    }

    public function get(Request $request,int $id) {
        $document = RKAKLDocument::where("rkakl_document.id", "=", $id)
            ->join('unit_kerja', 'rkakl_document.unit_kerja_code', "=", "unit_kerja.code")
            ->select('rkakl_document.*', 'unit_kerja.name as unit_kerja_name')
            ->first();

        if ($document == null) {
            return $this->sendError("error not found", "error document not found", 404);
        }

        $documentData = $this->RKAKLDocumentService->getDocumentDataByDocumentID($document->id);

        $response['document'] = $document;
        $response['documentData'] = $documentData;
        return $this->sendResponse($response);
}

    public function activate(Request $req, $id) {
        $document = RKAKLDocument::where("id", "=", $id)->first();

        $document->is_active = true;
        $document->save();
        return $this->sendResponse($document);
    }

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function generateSummary(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'year' => 'required',
            'unitOrganisasiCode' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation error', $validator->errors(), 400);
        }

        $documents = RKAKLDocument::where("year", "=", $request->year)
            ->where("is_active", '=', 1)
            ->where("unit_org_code", '=', $request->unitOrganisasiCode)
            ->join('unit_kerja', 'rkakl_document.unit_kerja_code', "=", "unit_kerja.code")
            ->select('rkakl_document.*', 'unit_kerja.name as unit_kerja_name')
            ->get();

        $documentData = [];
        foreach ($documents as $document) {
            $documentData[] = $this->RKAKLDocumentService->getDocumentDataByDocumentID($document->id);
        }

        if (count($documentData) == 0) {
            return $this->sendError('error generate', 'error no document found');
        }

        $summary = $this->RKAKLDocumentService->createSummary($documentData);

        $timestamp = now()->timestamp;
        $randomString = Str::random(8);

        $filename = $timestamp . $randomString . '.xlsx';

        try {
            $spreadsheet = new Spreadsheet();

            //generate header for spreadsheet
            $index = 1;
            $spreadsheet->getActiveSheet()->setCellValue('B'.$index, 'TOTAL UPT');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('D'.$index, 'Modal Qty');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('E'.$index, 'Satuan');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('F'.$index, 'Harga Satuan');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('G'.$index, 'Pagu');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('H'.$index, 'RAB');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('I'.$index, 'Catatan');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('J'.$index, 'Sakti');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
            $spreadsheet->getActiveSheet()->setCellValue('K'.$index, 'Catatan');
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);

            $spreadsheet->getActiveSheet()->getStyle('A1:K1')->getFill()->setFillType(Fill::FILL_SOLID);
            $spreadsheet->getActiveSheet()->getStyle('A1:K1')->getFill()->getStartColor()->setARGB(Color::COLOR_YELLOW);
            $spreadsheet->getActiveSheet()->getStyle('A1:K1')->getFill()->getEndColor()->setARGB(Color::COLOR_YELLOW);

            //generate pagu
            $index += 1;
            $spreadsheet->getActiveSheet()->setCellValue('B'.$index, 'Pagu');
            $totalAmount = 0;
            $summary->sumTotalAmountByType('program', $totalAmount);
            $spreadsheet->getActiveSheet()->setCellValue('J'.$index, $totalAmount);

            $summary->generateRowSpreadsheet($spreadsheet, $index);

            $indexDocument = 1;
            foreach ($documentData as $document) {
                $spreadsheet->getActiveSheet()->setCellValue('A'.$index, $indexDocument);
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('B'.$index, $documents[$indexDocument-1]->unit_kerja_name);
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('D'.$index, 'Modal Qty');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('E'.$index, 'Satuan');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('F'.$index, 'Harga Satuan');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('G'.$index, 'Pagu');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('H'.$index, 'RAB');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('I'.$index, 'Catatan');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('J'.$index, 'Sakti');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);
                $spreadsheet->getActiveSheet()->setCellValue('K'.$index, 'Catatan');
                $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getFont()->setBold(true);

                $spreadsheet->getActiveSheet()->getStyle('A'.$index.':K'.$index)->getFill()->setFillType(Fill::FILL_SOLID);
                $spreadsheet->getActiveSheet()->getStyle('A'.$index.':K'.$index)->getFill()->getStartColor()->setARGB(Color::COLOR_YELLOW);
                $spreadsheet->getActiveSheet()->getStyle('A'.$index.':K'.$index)->getFill()->getEndColor()->setARGB(Color::COLOR_YELLOW);


                //generate pagu
                $index += 1;
                $spreadsheet->getActiveSheet()->setCellValue('B'.$index, 'Pagu');
                $totalAmount = 0;
                $summary->sumTotalAmountByType('program', $totalAmount);
                $spreadsheet->getActiveSheet()->setCellValue('J'.$index, $totalAmount);
                $spreadsheet->getActiveSheet()->getStyle('A'.$index.':K'.$index)->getFill()->setFillType(Fill::FILL_SOLID);
                $spreadsheet->getActiveSheet()->getStyle('A'.$index.':K'.$index)->getFill()->getStartColor()->setARGB(Color::COLOR_GREEN);
                $spreadsheet->getActiveSheet()->getStyle('A'.$index.':K'.$index)->getFill()->getEndColor()->setARGB(Color::COLOR_GREEN);

                $document->generateRowSpreadsheet($spreadsheet, $index);
                $indexDocument += 1;
            }

            //format column width
            $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(10);
            $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(10);
            $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(20);
            $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(10);
            $spreadsheet->getActiveSheet()->getColumnDimension('E')->setWidth(10);
            $spreadsheet->getActiveSheet()->getColumnDimension('F')->setWidth(15);
            $spreadsheet->getActiveSheet()->getColumnDimension('G')->setWidth(15);
            $spreadsheet->getActiveSheet()->getColumnDimension('H')->setWidth(15);
            $spreadsheet->getActiveSheet()->getColumnDimension('I')->setWidth(15);
            $spreadsheet->getActiveSheet()->getColumnDimension('J')->setWidth(15);

            $writer = new Xlsx($spreadsheet);
            $path = storage_path('app/public/' . $filename);
            $writer->save($path);
        } catch (Exception $e){
            abort(500, $e);
        }

        $data['URL'] = '/download/' . $filename;
        return $this->sendResponse($data);
    }

    /**
     * @throws Exception
     */
    public function getAll(Request $request) {
        try
        {
            $document = RKAKLDocument::select(
                'rkakl_document.*',
                'unit_organisasi.name as unit_organisasi_name',
                'lembaga.name as lembaga_name',
                'unit_kerja.name as unit_kerja_name'

            )
            ->join('lembaga', 'rkakl_document.lembaga_code', '=', 'lembaga.code')
            ->join('unit_organisasi', 'rkakl_document.unit_org_code', '=', 'unit_organisasi.code')
            ->join('unit_kerja', 'rkakl_document.unit_kerja_code', "=", "unit_kerja.code");
        }
        catch (Exception $err){
            throw new Exception($err);
        }

        $currentPage = request('page', 1);
        $perPage = request('perPage', 10);


        $collection = new Collection($document);

        $paginatedData = new LengthAwarePaginator(
            $collection->forPage($currentPage, $perPage),
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => url($request->path())]
        );
        return $this->sendResponse($document->get());
    }
}

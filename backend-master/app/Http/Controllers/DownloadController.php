<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ricardoboss\Console;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadController extends Controller
{
    public function downloadFile($filename)
    {
        $filePath = Storage::disk('public')->path('app/'. $filename);

        if (Storage::disk('public')->exists($filename)) {
            return Storage::disk('public')->download($filename);
        } else {
            abort(404, 'File not found');
        }
    }
}

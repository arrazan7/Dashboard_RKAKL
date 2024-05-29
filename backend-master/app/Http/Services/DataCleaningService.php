<?php
// app/Services/DataCleaningService.php

namespace App\Http\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\Exception;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Row;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Symfony\Component\ErrorHandler\Debug;
use function Laravel\Prompts\error;
use function Psy\debug;
use function Symfony\Component\Translation\t;
use ricardoboss\Console;
class DataCleaningService
{
    public function cleanData($pathData): ?TreeNode
    {

        try {
            $worksheet = $this->readExcel($pathData);
            $finalData = $this->cleanColumns($worksheet);

            return $finalData;
        } catch (\Exception $e) {
            error_log("error" . $e->getMessage());
            return null;
        }
    }

    private function readExcel($pathData)
    {
        $dataset = \PhpOffice\PhpSpreadsheet\IOFactory::load($pathData);
        return $dataset->getActiveSheet();
    }

    /**
     * @throws Exception
     */
    private function cleanColumns(Worksheet $worksheet) : TreeNode
    {
        $parent = new RowData("", "", true, true);
        $data[] = [];
        foreach ($worksheet->getRowIterator() as $row) {
            $colCode = $row->getWorksheet()->getCellByColumnAndRow(1, $row->getRowIndex());
            if ($colCode == "") {
                continue;
            }
            $parsedValue = $this->getRowValueAndType($row, $parent);
            if ($parsedValue->isNull) {
                continue;
            }

            $data[] = $parsedValue;
        }

        $root = new TreeNode("root", "Root Value", "Document", "", 0, 0);

        $key = ["", "", "", "", "", "", "", "", "Root Value"];
        $parentValue = 'Root Value';
        $lastLevel = 8;
        $lastData = 'Root Value';
        for ($i = 0; $i < count($data) ; $i++) {
//        for ($i = 0; $i < 100; $i++) {
            $currentData = $data[$i];
            if ($currentData == null || $currentData->type == "")  {
                continue;
            }

            $newNode = new TreeNode($currentData->type, $currentData->value, $currentData->value, $currentData->qty, $currentData->amount, $currentData->totalAmount);
            $key[strval($newNode->getTypeLevel())] = $currentData->value;

            $usedKey = array_slice($key, $newNode->getTypeLevel(), );
            $newNode->setValue(join(" | ", $usedKey));

            if ($newNode->getTypeLevel() > $lastLevel) {
                $parentNode = $root->getLevelFromNode($lastData, $newNode->getTypeLevel());
                $parentNode->getParent()->addChildWithoutValidation($newNode);
                $lastLevel = $newNode->getTypeLevel();
                $lastData = $newNode->getValue();
                $parentValue = $newNode->getValue();
            } elseif ($newNode->getTypeLevel() == $lastLevel) {
                $selectedNode = $root->searchByValue($parentValue);
                $selectedNode->getParent()->addChildWithoutValidation($newNode);
                $lastLevel = $newNode->getTypeLevel();
                $lastData = $newNode->getValue();
            }
            else {
                $selectedNode = $root->searchByValue($parentValue);
                $selectedNode->addChildWithoutValidation($newNode);
                $parentValue = $newNode->getValue();
                $lastLevel = $newNode->getTypeLevel();
                $lastData = $newNode->getValue();
            }


        }

        return $root;
    }

    private function getRowValueAndType(Row $row, RowData $parent) : RowData
    {
        $type = "";
        $colCode = $row->getWorksheet()->getCellByColumnAndRow(1, $row->getRowIndex());

        $type = $this->getTypeByValue($colCode->getValue(), $parent);
        if ($type == "") {
            return new RowData("", "", true, [1, $row->getRowIndex()]);
        }

        $value = strval($colCode->getValue());
        if ($type == "kro") {
            $value = explode(".", $value)[1];
        }
        if ($type == "ro") {
            $value = explode(".", $value)[2];
        }

        $rowData = new RowData($type, $value, false, [1, $row->getRowIndex()]);

        $colQTY = $row->getWorksheet()->getCellByColumnAndRow(7, $row->getRowIndex());
        if ($colQTY->getValue() != "") {
            $rowData->setQty(strval($colQTY->getValue()));
        }

        $colAmount = $row->getWorksheet()->getCellByColumnAndRow(8, $row->getRowIndex());
        if ($colAmount->getValue() != "") {
            $rowData->setAmount(intval($colAmount->getValue()));
        }

        $colTotalAmount = $row->getWorksheet()->getCellByColumnAndRow(10, $row->getRowIndex());
        if ($colTotalAmount->getValue() != "") {
            $rowData->setTotalAmount(intval($colTotalAmount->getValue()));
        }

        return $rowData;
    }

    private function getTypeByValue(mixed $value, RowData $parent): string
    {
        $value = strval($value);
        switch (strlen($value)) {
            case 9 : {
                return "program";
            }
            case 4 : {
                return "kegiatan";

            }
            case 8 : {
                return "kro";

            }
            case 12 : {
                return "ro";

            }
            case 3 : {
                return "komponen";

            }
            case 1 : {
                return "subkomponen";

            }
            case 6 : {
                return "detail";

            }
        }

        return "";
    }

    private function validateParsedValue(RowData $parsedValue, RowData $parent) : RowData
    {
        switch (true) {
            case $parent->type == "detail" && $parsedValue->type == "detail": {
                return $parent;
            }
            case $parent->type == "detail" && $parsedValue->type == "": {
                return new RowData("", "subkomponen", false);
            }
            case $parsedValue->type == "" : {
                return new  RowData("", "", true);
            }
            default: {
                return $parsedValue;
            }
        }

    }




}

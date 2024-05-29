<?php

namespace App\Http\Services;
use App\Models\RKAKLComponent;
use Illuminate\Support\Collection;
use ricardoboss\Console;
use Symfony\Component\ErrorHandler\Debug;
use function Symfony\Component\String\b;

class TreeNode
{
    public $type;
    public $value;
    public $data;

    private $label;

    public int $amount;
    public string $qty;
    public int $totalAmount;

    public function getTotalAmount(): int
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(int $totalAmount): void
    {
        $this->totalAmount = $totalAmount;
    }

    /**
     * @return mixed
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param mixed $label
     */
    public function setLabel($label): void
    {
        $this->label = $label;
    }

    public $children = [];
    private TreeNode | null $parent = null;

    public function setParent(?TreeNode $parent): void
    {
        $this->parent = $parent;
    }

    public function __construct($type, $value, $data, $qty, $amount, $totalAmount)
    {
        $this->type = $type;
        $this->value = $value;
        $this->data = $data;
        $this->amount = $amount;
        $this->qty = $qty;
        $this->totalAmount = $totalAmount;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param mixed $data
     */
    public function setData($data): void
    {
        $this->data = $data;
    }

    /**
     * @param mixed $value
     */
    public function setValue($value): void
    {
        $this->value = $value;
    }

    public function addChild(TreeNode $node)
    {
        $currentLevel = $this->getTypeLevel();
        $nodeLevel = $node->getTypeLevel();
        if ($currentLevel - $nodeLevel == 1) {
            $node->setParent($this);
            $this->children[] = $node;
        } else {
            foreach ($this->children as $child) {
                if ($child instanceof TreeNode){
                    $child->addChild($node);
                }
                break;
            }
        }
    }

    public function addChildWithoutValidation(TreeNode $node) {
        $node->setParent($this);
        $this->children[] = $node;
    }

    public function searchByValue($searchValue)
    {
        if ($this->value === $searchValue) {
            return $this;
        }

        foreach ($this->children as $child) {
            if ($child instanceof TreeNode){
                $result = $child->searchByValue($searchValue);
                if ($result !== null) {
                    return $result;
                }
            }

        }

        return null;
    }

    public function searchByData($searchValue)
    {
        if ($this->data === $searchValue) {
            return $this;
        }

        foreach ($this->children as $child) {
            if ($child instanceof TreeNode){
                $result = $child->searchByValue($searchValue);
                if ($result !== null) {
                    return $result;
                }
            }

        }

        return null;
    }


    public function getChildren()
    {
        return $this->children;
    }

    public function getValue()
    {
        if ($this->value == null) {
            return "";
        }
        return $this->value;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getTypeLevel()
    {
        switch ($this->type) {
            case "root": {
                return 8;
            }
            case "program":{
                return 7;
            }
            case "kegiatan": {
                return 6;
            }
            case "kro": {
                return 5;
            }
            case "ro": {
                return 4;
            }
            case "komponen": {
                return 3;
            }
            case "subkomponen": {
                return 2;
            }
            case "detail": {
                return 1;
            }
        }
        return 0;
    }

    public function getParent()
    {
        return $this->parent;
    }

    public function isLocked(): bool
    {
        return $this->isLocked;
    }

    public function setIsLocked(bool $isLocked): void
    {
        $this->isLocked = $isLocked;
    }

    public function printTree($level = 0)
    {

        foreach ($this->children as $child) {
            if ($child instanceof TreeNode){
                $child->printTree($level + 1);
            }
        }
    }

    public function getLevelFromNode($lastData, $level) : TreeNode
    {
        $selectedValue = $this->searchByValue($lastData);
        if ($selectedValue == null) {
        }

        if ($level > 7 ) {
            $level = 7;
        }

        $sameLevel = $selectedValue->findSameLevelParent($level);
        if ($sameLevel == null) {
        }

        return $sameLevel;
    }

    public function findSameLevelParent($level) : TreeNode | null {
        if ($this == null) {
            return null;
        }
        if ($this->getTypeLevel() == $level) {
            return $this;
        }

        if ($this->parent == null) {
            return $this;
        }

        return $this->parent->findSameLevelParent($level);
    }

    public function toArray()
    {
        $nodeArray = [
            'type' => $this->type,
            'value' => $this->value,
            'data' => $this->data,
            'label' => $this->label,
            'volume' => $this->qty,
            'amount' => $this->amount,
            'totalAmount' => $this->totalAmount,
            'children' => [],
        ];

        foreach ($this->children as $child) {
            $nodeArray['children'][] = $child->toArray();
        }

        return $nodeArray;
    }

    public function fillMasterData()
    {
        switch (true){
            case $this->type == "program";
                $component = RKAKLComponent::where('program_code', '=', $this->data)
                    ->limit(1)
                    ->first();
                if ($component == null) {
                    return;
                }
                $this->label = $component->program_name;
                break;
            case $this->type == "kegiatan":
                $component = RKAKLComponent::where('program_code', '=', $this->parent->data)
                    ->where('kegiatan_code', '=', $this->data)
                    ->limit(1)
                    ->first();
                if ($component == null) {
                    return;
                }
                $this->label = $component->kegiatan_name;
                break;
            case $this->type == "kro":
                $component = RKAKLComponent::where('program_code', '=', $this->parent->parent->data)
                    ->where('kegiatan_code', '=', $this->parent->data)
                    ->where('kro_code', '=', $this->data)
                    ->limit(1)
                    ->first();
                if ($component == null) {
                    return;
                }
                $this->label = $component->kro_name;
                break;
            case $this->type == "ro":
                $component = RKAKLComponent::where('program_code', '=', $this->parent->parent->parent->data)
                    ->where('kegiatan_code', '=', $this->parent->parent->data)
                    ->where('kro_code', '=', $this->parent->data)
                    ->where('ro_code', '=', $this->data)
                    ->limit(1)
                    ->first();
//                Console::debug('ro ' . $this->data. ' '. $this->parent->data. ' k '. $this->parent->parent->data. ' '. $this->parent->parent->parent->data);

                if ($component == null) {
                    return;
                }
                $this->label = $component->ro_name;
                break;
            case $this->type == "komponen":
                $component = RKAKLComponent::where('program_code', '=', $this->parent->parent->parent->parent->data)
                    ->where('kegiatan_code', '=', $this->parent->parent->parent->data)
                    ->where('kro_code', '=', $this->parent->parent->data)
                    ->where('ro_code', '=', $this->parent->data)
                    ->where('komponen_code', '=', $this->data)
                    ->limit(1)
                    ->first();
                if ($component == null) {
                    return;
                }
                $this->label = $component->komponen_name;
        }

        foreach ($this->children as $child) {
            if ($child instanceof TreeNode) {
                $child->fillMasterData();
            }

        }
    }

    public function toRowBased()
    {
        $result = new Collection();
        $this->getChildByNodeType("detail", $result);
        foreach ($result as $node) {
            if ($node instanceof TreeNode) {

            }

        }
    }

    public function getChildByNodeType(string $type, Collection &$result)
    {
        if ($this->type == 'detail') {
             $result->add($this);
        }
        foreach ($this->children as $child) {
            if ($child instanceof TreeNode) {
                $child->getChildByNodeType($type, $result);
            }
        }
    }

    public function resetAllValue()
    {
        $this->amount = 0;
        $this->totalAmount = 0;
        foreach ($this->children as $child) {
            if ($child instanceof TreeNode) {
                $child->resetAllValue();
            }
        }
    }

    public function createSummaryTotal(TreeNode $documentDatum)
    {
        $selectedField = $documentDatum->searchByData($this->getData());

        if ($selectedField == null) {
            return;
        }
        $totalAmount = $this->getTotalAmount() + $selectedField->getTotalAmount();
        $this->setTotalAmount($totalAmount);
        foreach ($this->children as $child) {
            if ($child instanceof TreeNode) {
                $child->createSummaryTotal($documentDatum);
            }

        }

    }

    public function __clone()
    {
        $this->totalAmount = 0;
        $this->value = 0;
        $this->children = array_map(function ($child) {
            return clone $child;
        }, $this->children);
    }

    public function generateRowSpreadsheet(\PhpOffice\PhpSpreadsheet\Spreadsheet &$spreadsheet,int &$index): void
    {
        $isDisplayForSummary = $this->type == 'program' || $this->type == 'kegiatan' || $this->type == 'ro' || $this->type == "komponen";
        if ($isDisplayForSummary) {
            $index = $index + 1;
            $spreadsheet->getActiveSheet()->setCellValue('A'.$index, $this->type);
            $spreadsheet->getActiveSheet()->setCellValue('B'.$index, $this->data);
            $spreadsheet->getActiveSheet()->setCellValue('C'.$index, $this->label);
            $spreadsheet->getActiveSheet()->getStyle($spreadsheet->getActiveSheet()->getActiveCell())->getAlignment()->setWrapText(true);
            $spreadsheet->getActiveSheet()->setCellValue('J'.$index, $this->totalAmount);
        }

        foreach ($this->children as $child) {
            if ($child instanceof TreeNode) {
                $child->generateRowSpreadsheet($spreadsheet, $index);
            }
        }
    }

    public function sumTotalAmountByType(string $type, int &$totalAmount)
    {
        if ($this->type == 'program') {
            $totalAmount += $this->totalAmount;
        }
        foreach ($this->children as $child) {
            if ($child instanceof TreeNode) {
                $child->sumTotalAmountByType($type, $totalAmount);
            }
        }
    }
}


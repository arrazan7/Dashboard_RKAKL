<?php

namespace App\Http\Services;

class RowData
{
    public string $type;
    public string $value;
    public $isNull;
    public $columnIndex;
    public bool $isFirstData;

    public int $amount = 0;
    public string $qty = "";
    public int $totalAmount = 0;

    // Constructor
    public function __construct($type, $value, $isNull, $columnIndex = [], $isFirstData = false) {
        $this->type = $type;
        $this->value = $value;
        $this->isNull = $isNull;
        $this->isFirstData = $isFirstData;
        $this->columnIndex = $columnIndex;
    }

    /**
     * @return mixed
     */
    public function getType() : string
    {

        return $this->type;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @return mixed
     */
    public function getIsNull()
    {
        return $this->isNull;
    }

    public function getColumnIndex(): mixed
    {
        return $this->columnIndex;
    }

    public function isFirstData(): bool
    {
        return $this->isFirstData;
    }


    public function getAmount(): int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): void
    {
        $this->amount = $amount;
    }

    public function getQty(): string
    {
        return $this->qty;
    }

    public function setQty(string $qty): void
    {
        $this->qty = $qty;
    }

    public function getTotalAmount(): int
    {
        return $this->totalAmount;
    }

    public function setTotalAmount(int $totalAmount): void
    {
        $this->totalAmount = $totalAmount;
    }
}

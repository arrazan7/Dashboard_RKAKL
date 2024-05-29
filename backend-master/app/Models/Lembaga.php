<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lembaga extends Model
{
    use HasFactory;
    protected $table = 'lembaga';


    /**
     * Get all of the unitOrganisasi for the Lembaga
     *
     * @return \Illuminate\Database\quent\Relations\HasMany
     */
    public function unitOrganisasi(): HasMany
    {
        return $this->hasMany(UnitOrganisasi::class);
    }
}

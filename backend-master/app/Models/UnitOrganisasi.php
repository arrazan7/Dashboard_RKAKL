<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitOrganisasi extends Model
{
    use HasFactory;
    protected $table = 'unit_organisasi';


    /**
     * Get the lembaga that owns the UnitOrganisasi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lembaga(): BelongsTo
    {
        return $this->belongsTo(Lembaga::class);
    }

    /**
     * Get all of the unitKerja for the UnitOrganisasi
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function unitKerja(): HasMany
    {
        return $this->hasMany(UnitKerja::class);
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rkakl_components', function (Blueprint $table) {
            $table->id();
            $table->string('unit_kerja_code');
            $table->string('program_code');
            $table->string('program_name');
            $table->string('kegiatan_code');
            $table->string('kegiatan_name');
            $table->string('kro_code');
            $table->string('kro_name');
            $table->string('ro_code');
            $table->string('ro_name');
            $table->string('komponen_code');
            $table->string('komponen_name');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rkakl_components');
    }
};

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
        Schema::create('rkakl_document', function (Blueprint $table) {
            $table->id();
            $table->string('lembaga_code');
            $table->string('unit_org_code');
            $table->string('unit_kerja_code');
            $table->integer('version');
            $table->integer('year');
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rkakl_document');
    }
};

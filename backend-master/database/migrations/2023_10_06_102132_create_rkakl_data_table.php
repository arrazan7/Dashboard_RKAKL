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
        Schema::create('rkakl_data', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('document_id');
            $table->bigInteger('parent_component')->nullable();
            $table->string('component_code')->nullable();
            $table->enum('type', ['program', 'kegiatan', 'kro', 'ro', 'komponen', 'subkomponen', 'detail', 'sub-detail']);
            $table->string('custom_name')->nullable();
            $table->bigInteger('amount')->default(0);
            $table->string('volume')->default("");
            $table->bigInteger('total_amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rkakl_data');
    }
};

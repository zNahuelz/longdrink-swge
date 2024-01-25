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
        Schema::create('curso_temas', function (Blueprint $table) {
            $table->unsignedBigInteger('cod_curso');
            $table->unsignedBigInteger('cod_tema');
            $table->foreign('cod_curso')->references('cod_curso')->on('cursos');
            $table->foreign('cod_tema')->references('cod_tema')->on('temas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('curso_temas');
    }
};

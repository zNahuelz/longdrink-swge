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
        Schema::create('curso_turnos', function (Blueprint $table) {
            $table->unsignedBigInteger('cod_curso');
            $table->unsignedBigInteger('cod_turno');
            $table->foreign('cod_curso')->references('cod_curso')->on('cursos');
            $table->foreign('cod_turno')->references('cod_turno')->on('turnos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('curso_turnos');
    }
};

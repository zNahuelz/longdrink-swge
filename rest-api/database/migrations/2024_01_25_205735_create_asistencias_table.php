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
        Schema::create('asistencias', function (Blueprint $table) {
            $table->id('cod_asistencia');
            $table->timestamp('fecha_asistencia');
            $table->time('hora_llegada');
            $table->boolean('estado')->default(true);
            $table->unsignedBigInteger('cod_inscripcion');
            $table->foreign('cod_inscripcion')->references('cod_inscripcion')->on('inscripciones');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asistencias');
    }
};

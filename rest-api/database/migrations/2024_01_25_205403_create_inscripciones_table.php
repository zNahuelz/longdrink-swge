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
        Schema::create('inscripciones', function (Blueprint $table) {
            $table->id('cod_inscripcion');
            $table->timestamp('fecha_inscripcion');
            $table->timestamp('fecha_terminado');
            $table->boolean('estado')->default(true);
            $table->unsignedBigInteger('seccion_cod_seccion');
            $table->unsignedBigInteger('alumno_cod_alumno');
            $table->unsignedBigInteger('turno_cod_turno');
            $table->foreign('seccion_cod_seccion')->references('cod_seccion')->on('secciones');
            $table->foreign('alumno_cod_alumno')->references('cod_alumno')->on('alumnos');
            $table->foreign('turno_cod_turno')->references('cod_turno')->on('turnos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripciones');
    }
};

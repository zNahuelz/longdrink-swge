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
        Schema::create('secciones', function (Blueprint $table) {
            $table->id('cod_seccion');
            $table->string('nombre',30);
            $table->timestamp('fecha_inicio');
            $table->timestamp('fecha_final');
            $table->boolean('estado')->default(true);
            $table->unsignedBigInteger('cod_curso');
            $table->foreign('cod_curso')->references('cod_curso')->on('cursos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('secciones');
    }
};

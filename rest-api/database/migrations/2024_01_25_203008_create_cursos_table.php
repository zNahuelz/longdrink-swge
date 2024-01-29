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
        Schema::create('cursos', function (Blueprint $table) {
            $table->id('cod_curso');
            $table->string('nombre',50);
            $table->string('descripcion',100);
            $table->double('mensualidad',5,2);
            $table->tinyInteger('duracion',false,true);
            $table->boolean('visibilidad')->default(true);
            $table->text('imagen');
            $table->boolean('activo')->default(true);
            $table->unsignedBigInteger('cod_profesor');
            $table->unsignedBigInteger('cod_frecuencia');
            $table->foreign('cod_profesor')->references('cod_profesor')->on('profesores');
            $table->foreign('cod_frecuencia')->references('cod_frecuencia')->on('frecuencias');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};

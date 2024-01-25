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
        Schema::create('profesores', function (Blueprint $table) {
            $table->id('cod_profesor');
            $table->string('nombre',50);
            $table->string('apellido_paterno',25);
            $table->string('apellido_materno',25);
            $table->char('dni',9);
            $table->char('telefono',9);
            $table->timestamp('fecha_contratacion');
            $table->unsignedBigInteger('cod_usuario');
            $table->foreign('cod_usuario')->references('cod_usuario')->on('usuarios');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profesores');
    }
};

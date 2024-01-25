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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id('cod_pago');
            $table->unsignedBigInteger('cod_alumno');
            $table->timestamp('fecha_pago')->nullable(true)->default(null);
            $table->timestamp('fecha_vencimiento');
            $table->boolean('estado')->default(false);
            $table->string('descripcion',100);
            $table->foreign('cod_alumno')->references('cod_alumno')->on('alumnos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};

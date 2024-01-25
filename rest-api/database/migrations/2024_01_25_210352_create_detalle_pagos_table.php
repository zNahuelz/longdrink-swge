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
        Schema::create('detalle_pagos', function (Blueprint $table) {
            $table->id('cod_detalle_pago');
            $table->unsignedBigInteger('cod_pago');
            $table->unsignedBigInteger('cod_monto_mora');
            $table->string('concepto',100);
            $table->double('monto',7,2);
            $table->double('sub_total',7,2);
            $table->double('total',7,2);
            $table->foreign('cod_pago')->references('cod_pago')->on('pagos');
            $table->foreign('cod_monto_mora')->references('cod_monto')->on('monto_moras');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_pagos');
    }
};

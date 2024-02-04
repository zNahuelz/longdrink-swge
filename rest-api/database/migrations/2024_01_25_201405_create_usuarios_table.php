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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('cod_usuario');
            $table->string('nombre_usuario',15)->unique();
            $table->string('password',255);
            $table->string('email',80)->unique();
            $table->boolean('activo')->default(true);
            $table->unsignedBigInteger('cod_rol');
            $table->foreign('cod_rol')->references('cod_rol')->on('roles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};

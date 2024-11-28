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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name',50)->unique();
            $table->string('description',150);
            $table->double('monthly_payment',5,2);
            $table->integer('duration');
            $table->text('image')->charset('binary'); // -->> BLOB
            $table->unsignedBigInteger('section_id');
            //$table->foreign('section_id')->references('id')->on('sections');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

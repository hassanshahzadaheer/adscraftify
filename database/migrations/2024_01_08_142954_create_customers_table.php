<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique(); // Foreign key reference to users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('contact')->nullable();
            $table->string('skypeWhatsApp')->nullable();
            $table->string('domain')->nullable();
            $table->integer('pageViewsPerDay')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}

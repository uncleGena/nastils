<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSoftDeletes extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        if (Schema::hasTable('clients')) {
            Schema::table('clients', function(Blueprint $table) {
                $table->softDeletes();
            });
        }
        if (Schema::hasTable('spends_types')) {
            Schema::table('spends_types', function(Blueprint $table) {
                $table->softDeletes();
            });
        }
        if (Schema::hasTable('spends')) {
            Schema::table('spends', function(Blueprint $table) {
                $table->softDeletes();
            });
        }
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        Schema::table('clients', function(Blueprint $table) {
            $table->dropColumn(['deleted_at']);
        });
        Schema::table('spends_types', function(Blueprint $table) {
            $table->dropColumn(['deleted_at']);
        });
        Schema::table('spends', function(Blueprint $table) {
            $table->dropColumn(['deleted_at']);
        });
    }
}

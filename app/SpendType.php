<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SpendType extends Model
{
    use SoftDeletes;
    protected $table = 'spends_types';
}

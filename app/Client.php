<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use SoftDeletes;
    protected $table = 'clients';
}

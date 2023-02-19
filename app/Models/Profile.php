<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at'=> 'date:d-m-Y'
    ];

     /**
     * relationships
    */
    public function user(){
        return $this->belongsTo(User::class)->withDefault();
    }
}
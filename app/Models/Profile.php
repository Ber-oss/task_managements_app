<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable=[
        'first_name',
        'last_name',
        'profile',
        'user_id',
        'avatar'
    ];

    protected $casts = [
        'created_at'=> 'date:d/m/Y'
    ];

    protected $appends=['avatar_url'];

     /**
     * relationships
    */
    public function user(){
        return $this->belongsTo(User::class)->withDefault();
    }

    /**
     * getter to save get avatar url
    */
    public function getAvatarUrlAttribute(){
        $avatar=$this->avatar?$this->avatar:'default.png';
        return asset('avatars/'.$avatar);
    }

}

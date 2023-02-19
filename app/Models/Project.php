<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'slug',
        'user_id',
        'description',
        'status'
    ];

    protected $casts = [
        'created_at'=> 'date:d-m-Y'
    ];

    /**
     * closure that save project's slug
    */
    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            $project->slug=Str::slug($project->name);
        });
    }

    /**
     * relationships
    */
    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function creator(){
        return $this->belongsTo(User::class)->withDefault();
    }


   
}

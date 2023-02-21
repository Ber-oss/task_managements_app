<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'slug',
        'project_id',
        'description',
        'status',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        // 'start_date' => 'date',
        // 'end_date' => 'date',
        'created_at'=> 'date:d/m/Y'
    ];

    
    /**
     * closure that save task's slug
    */
    protected static function booted(): void
    {
        static::creating(function (Task $task) {
            $task->slug=Str::slug($task->name);
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * relationships
    */
    public function project(){
        return $this->belongsTo(Project::class)->withDefault();
    }

    public function members(){
        return $this->belongsToMany(User::class)->withPivot('note');
    }

}

<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cviebrock\EloquentSluggable\Sluggable;

class Project extends Model
{
    use HasFactory,Sluggable;

    protected $fillable=[
        'name',
        'slug',
        'user_id',
        'description',
        'status'
    ];

    protected $casts = [
        'created_at'=> 'date:d/m/Y'
    ];

    protected $appends=['progress'];

    /**
     * closure that save project's slug
    */
    // protected static function booted(): void
    // {
    //     static::creating(function (Project $project) {
    //         $project->slug=Str::slug($project->name);
    //     });
    // }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ]
        ];
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
    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function user(){
        return $this->belongsTo(User::class)->withDefault([
            'name'=>'',
            'email'=>''
        ]);
    } 

    /**
     * getter to save project progress
    */

    public function getProgressAttribute(){
        $completed_tasks= $this->tasks()->where('status','like','completed')->count();
        $total_task=$this->tasks()->count();
        return ($completed_tasks/$total_task)*100;
    }

}

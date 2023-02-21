<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{

    public function before(User $user)
    {
        if ($user->role=='admin') {
            return true;
        }
    
        return null;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user,Project $project): bool
    {
        return $project->user_id==$user->id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task): bool
    {
        return $task->project->user_id==$user->id ;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): bool
    {
        return $task->project->user_id==$user->id;
    }
}

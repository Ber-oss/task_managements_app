<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function statistics(){

        $query=Project::whereRelation('tasks.members','id',auth()->user()->id)
        ->orWhere('user_id',auth()->user()->id);

        $total_projects=$query->count();

        $query=Task::whereRelation('members','id',auth()->user()->id)
        ->orWhereRelation('project','user_id',auth()->user()->id);
        
        $completed_tasks=$query->where('status','like','completed')->count();
        $pending_tasks=$query->where('status','like','pending')->count();
        $processing_tasks=$query->where('status','like','processing')->count();

        $total_task=$query->count();

        $total_progress=$total_task?($completed_tasks/$total_task)*100:$total_task;
      
        return response()->json(compact('total_projects','total_progress','completed_tasks','pending_tasks','processing_tasks'));
        
        
       



    }
}

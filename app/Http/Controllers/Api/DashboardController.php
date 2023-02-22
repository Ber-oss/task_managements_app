<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function statistics(){

        $total_projects=Project::own(auth()->user()->id)->count();

        $completed_tasks=Task::own(auth()->user()->id)->where('status','completed')->count();
        $pending_tasks=Task::own(auth()->user()->id)->where('status','pending')->count();
        $processing_tasks=Task::own(auth()->user()->id)->where('status','processing')->count();
      
        return response()->json(compact('total_projects','completed_tasks','pending_tasks','processing_tasks'));
        
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\TaskRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Throwable;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'tasks'=>Task::all()
        ]);
    }

    public function getData(Request $request){
        $tasks="";
        if($request->project_slug){
            $project=Project::whereSlug($request->project_slug)->first();
            $tasks=$project->tasks()
            ->with(['project','members'])
            ->orderBy('created_at','desc');
        }
        else{
            $tasks=Task::with(['project','members'])
            ->whereRelation('members','id',$request->user_id)
            ->orderBy('created_at','desc');
        }
        
        return datatables($tasks)->toJson();
    }

    public function getUsers(Request $request){
        $users=User::where('name','ilike',"%$request->search%")->select('id','name')->get();
      
        return response()->json([
            'users'=>$users
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
    
        $data=$request->validated();

        $project=Project::whereSlug($request->project_slug)->firstOrFail();
        
        
        DB::beginTransaction();

        try {
            $task=$project->tasks()->create($data);
            if($request->members){
                $task->members()->attach($request->members);
            }
           

            DB::commit();

        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        return response()->json([
            'message'=>'Task created successfully',
            'task'=>$task
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json([
            'task'=>$task->load(['members','project'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        DB::beginTransaction();

        try {
            $task->update($request->validated());
            if($request->members){
                $task->members()->sync($request->members);
            }
            

            DB::commit();

        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        return response()->json([
            'message'=>'Task updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'message'=>'Task deleted successfully'
        ]);
    }
}

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
      
        $tasks=Task::with(['project','members'])
        ->when($request->user_id,function($query) use ($request){
            $query->orWhereRelation('members','id',$request->user_id);
        })
        ->when($request->project_slug,function($query) use ($request){
            $query->orWhereRelation('project','slug',$request->project_slug);
        })
        ->orderBy('created_at','desc');
         
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
        
        if (auth()->user()->cannot('create', $project)) {
             return response()->json(['error' => 'Forbidden'], 403);
        }

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
        if (auth()->user()->cannot('update', $task)) {
             return response()->json(['error' => 'Forbidden'], 403);
        }

        DB::beginTransaction();

        try {
            $task->update($request->validated());
           
            $task->members()->sync($request->members);
            
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
        if (auth()->user()->cannot('delete', $task)) {
             return response()->json(['error' => 'Forbidden'], 403);
        }

        $task->delete();

        return response()->json([
            'message'=>'Task deleted successfully'
        ]);
    }

    public function updateNote(Request $request,Task $task,$user_id){
        $task->members()->updateExistingPivot($user_id, [
            'note' => $request->note,
        ]);

        $task->update([
            'status'=>$request->status
        ]);

        return response()->json([
            'message'=>'Note and status upated succesfully'
        ]);
        
        
    }
}

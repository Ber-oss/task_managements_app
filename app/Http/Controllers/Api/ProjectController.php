<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'projects'=>Project::with('creator','tasks')->get()
        ]);
    }

    public function getData(){
        $projects=Project::with(['user','tasks'])->orderBy('created_at','desc');
        return datatables($projects)->toJson();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $data=$request->validated();

        $project=Project::create([
            'name'=>$data['name'],
            'description'=>$data['description'],
            'user_id'=>auth()->user()->id     
        ]);

        return response()->json([
            'message'=>'Project created successfully',
            'project'=>$project
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return response()->json([
            'project'=>$project->load(['user','tasks']),
            'membres'=>User::whereRelation('tasks.project','id',$project->id)->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $data=$request->validated();

        $project->update([
            'name'=>$data['name'],
            'description'=>$data['description'],
            'user_id'=>auth()->user()->id     
        ]);

        return response()->json([
            'message'=>'Project updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message'=>'Project deleted successfully'
        ]);

    }
}

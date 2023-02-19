<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ['projects'=>Project::all()];
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
            'project'=>$project->load(['creator','tasks'])
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

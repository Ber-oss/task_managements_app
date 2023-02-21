<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return User::with('profile')->withCount('createdProjects','tasks')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $user=User::create($request->validated());

        return response()->json([
            'message'=>'User created successfully',
            'user'=>$user
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json([
            'user'=>$user->load('profile')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $user->update($request->validated);
        return response()->json([
            'message'=>'User updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return response()->json([
            'message'=>'User deleted successfully',
        ]);
    }

    public function updateProfile(ProfileRequest $request,User $user){
        
        if (auth()->user()->cannot('update', $user)) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $data=$request->validated();

        if($request->avatar){
            $data['avatar']=$this->saveAvatar($request->avatar,$user);
        }

        $user->profile()->updateOrCreate([],$data);

        return response()->json([
            'message'=>'Profile updated successfully'
        ]);
    }


    protected function saveAvatar($avatar,$user){
        if($user->profile->avatar){
            if(file_exists(public_path('avatars/'.$user->profile->avatar))){
                unlink(public_path('avatars/'.$user->profile->avatar));
            }
        }
        $img_name=time().$user->id.'.png';

        \Image::make($avatar)
        ->resize(420, 240)
        ->save(public_path('avatars/'.$img_name)); 

        return $img_name;
    }
}

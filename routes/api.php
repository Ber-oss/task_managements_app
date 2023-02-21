<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'auth',
    'middleware' => 'guest',
], function () {
    Route::post('login', [AuthController::class,'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('authUser', [AuthController::class,'authUser']);
});

Route::group([
    'middleware' => 'auth',
], function () {
    Route::get('statistics',[DashboardController::class,'statistics']);

    Route::post('users/{user}/profile',[UserController::class,'updateProfile']);
    Route::patch('tasks/note/{task}/{user}',[TaskController::class,'updateNote']);

    Route::apiResource('projects',ProjectController::class);
    Route::apiResource('tasks',TaskController::class);
    Route::apiResource('users',UserController::class);
});

Route::post('projects/getData',[ProjectController::class,'getData']);
Route::post('tasks/getData',[TaskController::class,'getData']);

Route::post('getUsers',[TaskController::class,'getUsers']);



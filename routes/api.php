<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\WebsiteController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\AccountInformationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);


Route::apiResource('/customers', CustomerController::class);
Route::apiResource('/websites', WebsiteController::class);
Route::apiResource('/reports',ReportController::class);
Route::apiResource('/invoices', InvoiceController::class);
Route::apiResource('/accounts-info', AccountInformationController::class);

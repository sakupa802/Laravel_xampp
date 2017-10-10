<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::resource('fileup', 'FileupController');
// Route::post('fileup', 'FileupController@index');

// WOW
Route::post('wow', 'WowController@index');

Route::get('/wow/login', 'WowController@login');// ログインページ
Route::post('/wow/signin', 'WowController@signIn');// ログイン
Route::get('/wow/register', 'WowController@register');// ユーザー登録ページ
Route::post('/wow/signup', 'WowController@signUp');// ユーザー登録
Route::post('/wow/authcheck',  'WowController@authCheck');

//Route::group(['middleware' => 'wowauth'], function(){// ログインチェックMiddleware
	Route::get('/wow', 'WowController@index');// トップ
	Route::get('/wow/dashboard', 'WowController@dashboard');// トップ
	Route::get('/wow/signout', 'WowController@signOut');// ログアウト

	//記事一覧
	Route::get('/wow/list/{table}', 'WowController@postList');
//});
<?php

namespace Laravel\Providers;

use Illuminate\Support\ServiceProvider;
use Validation\CustomValidator;

class ValidatorServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
	  \Validator::resolver(function ($translator, $data, $rules, $messages) {
		  return new CustomValidator($translator, $data, $rules, $messages);
	  });
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		//
	}
}
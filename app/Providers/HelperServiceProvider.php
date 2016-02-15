<?php

namespace App\Providers;

use App;
use App\Helpers\Directory;
use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        App::bind('directory', function()
        {
            return new Directory;
        });
    }
}

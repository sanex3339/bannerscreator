<?php

namespace App\Support\Facades;
use Illuminate\Support\Facades\Facade;

class Directory extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'directory';
    }
}

<?php
namespace App\Helpers;

use File;

class Directory
{
    /**
     * Make a new directory, if that directory not exist.
     *
     * @param $dirPath
     */
    public function makeDirectory($dirPath)
    {
        if (!File::exists($dirPath)) {
            File::makeDirectory($dirPath);
        }
    }
}
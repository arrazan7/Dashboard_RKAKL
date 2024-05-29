<?php

namespace App\Providers;

use App\Http\Services\DataCleaningService;
use App\Http\Services\RKAKLDocumentService;
use Illuminate\Support\ServiceProvider;

class CoreServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(DataCleaningService::class, function ($app) {
            return new DataCleaningService();
        });
        $this->app->bind(RKAKLDocumentService::class, function () {
            return new RKAKLDocumentService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

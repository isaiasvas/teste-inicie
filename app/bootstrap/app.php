<?php
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        
         // Lançar exceções quando houver erro de autorização
         $exceptions->render(function (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Token de autenticação inválido',
            ], 403);
        });

        // Lançar exceções quando o usuário não estiver autenticado
        $exceptions->render(function (AuthenticationException $e) {
            // Verificar se a falha foi por token expirado
            if (str_contains($e->getMessage(), 'Token has expired')) {
                return response()->json([
                    'status' => false,
                    'message' => 'Token expirado. Por favor, faça login novamente.',
                ], 401);
            }

            return response()->json([
                'status' => false,
                'message' => 'Usuário não autenticado. Forneça um token válido.',
            ], 401);
        });
    })->create();
<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
Use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Lida com o login do usuário.
     *
     * Este método tenta autenticar um usuário usando o e-mail e a senha fornecidos.
     * Se for bem-sucedido, ele retornará uma resposta JSON com status verdadeiro, um token e uma mensagem de sucesso.
     * Se a autenticação falhar, ela retornará uma resposta JSON com status falso e uma mensagem de erro.
     * Em caso de exceção, retorna uma resposta JSON com a mensagem de exceção.
     *
     * @param Request $request A solicitação HTTP contendo 'e-mail' e 'senha'.
     * @return \Illuminate\Http\JsonResponse Resposta JSON indicando o resultado da tentativa de login.
     */
    public function login(Request $request) : JsonResponse {
        try{
            if(Auth::attempt($request->only('email', 'password'))){ 

                // Autenticação bem-sucedida
                $user = Auth::user();

                $token = $request->user()->createToken('api-token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'token' => $token,
                    'message' => 'Login realizado com sucesso',
                    'user' => $user,
                ],200);
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Email ou senha incorretos'
                ],404);
            }

        }catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Logout de um usuário autenticado.
     * 
     * Este método remove o token de acesso do usuário autenticado,
     * tornando-o inativo para autenticação.
     * 
     * Se o logout for bem-sucedido, ele retornará uma resposta JSON com status verdadeiro e uma mensagem de sucesso.
     * Em caso de exceção, retorna uma resposta JSON com a mensagem de exceção.
     *
     * @param Request $request A solicitação HTTP.
     * @return JsonResponse Resposta JSON indicando o resultado do logout.
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // Remove o token de acesso atual do usuário autenticado
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Logout realizado com sucesso'
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'status' => false,
                'message' => $exception->getMessage()
            ], 500);
        }
    }
}

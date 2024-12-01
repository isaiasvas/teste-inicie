<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Retorna uma lista paginada de usuários
     *
     * Este método retorna uma lista paginada de usuários do banco de dados
     * e retorna como uma resposta JSON.
     *
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo a lista de usuários
     */
    public function index(): JsonResponse
    {
        //
        $users = User::orderBy('id', 'DESC')->paginate(5);

        return response()->json(
            [
                'status' => true,
                'users' => $users,
            ],
            200,
        );
    }

    /**
     * Retorna um usuário específico
     *
     * Este método retorna um usuário específico do banco de dados
     * e retorna como uma resposta JSON.
     *
     * @param User $user O modelo do usuário a ser retornado
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo o usuário
     */
    public function show(User $user): JsonResponse
    {
        // Verifica se o usuário existe
        if(!$user) {
            // Retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Usuário nao encontrado',
                ],
                404,
            );
        }

        // Retorna uma resposta de sucesso
        return response()->json(
            [
                'status' => true,
                'user' => $user,
            ],
            200,
        );
    }

    /**
     * Cria um novo usuário
     *
     * Este método cria um novo usuário com base nos dados enviados
     * na requisição e retorna como uma resposta JSON.
     *
     * @param UserRequest $request A solicitação contendo os dados para criar o usuário
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo o usuário criado
     */
    public function store(UserRequest $request): JsonResponse
    {
        // Inicia a transação
        DB::beginTransaction();

        try {
            $user = User::create($request->all());

            // Operação concluida com sucesso
            DB::commit();

            // Retorna uma resposta de sucesso
            return response()->json(
                [
                    'status' => true,
                    'user' => $user,
                    'message' => 'Usuário criado com sucesso',
                ],
                201,
            );
        } catch (Exception $e) {
            // Operação não é concluida com exito
            DB::rollBack();

            // Retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => $e->getMessage(),
                ],
                500,
            );
        }
    }

    /**
     * Atualiza um usuário
     *
     * Este método atualiza um usuário com base nos dados enviados
     * na requisição e retorna como uma resposta JSON.
     *
     * @param UserRequest $request A solicitação contendo os dados para atualizar o usuário
     * @param User $user O modelo do usuário a ser atualizado
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo o usuário atualizado
     */
    public function update(UserRequest $request, User $user): JsonResponse
    {
        // Inicia a transação
        DB::beginTransaction();

        try {
            // Validar e filtrar os dados necessários para atualização
            $data = $request->only(['name', 'email', 'password']);

            // Garantir que a senha seja criptografada corretamente
            if ($request->has('password')) {
                $data['password'] = bcrypt($request->password);
            }

            // Atualiza o usuário com os dados filtrados
            $user->update($data);

            // Operação concluida com sucesso
            DB::commit();

            // Retorna uma resposta de sucesso
            return response()->json(
                [
                    'status' => true,
                    'user' => $user,
                    'message' => 'Usuário atualizado com sucesso',
                ],
                200,
            );
        } catch (Exception $e) {
            // Operação não é concluida com exito
            DB::rollBack();

            // Retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => $e->getMessage(),
                ],
                500,
            );
        }
    }

    /**
     * Deleta um usuário
     *
     * Este método deleta um usuário e retorna como uma resposta JSON.
     *
     * @param User $user O modelo do usuário a ser deletado
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo o status da operação
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            // Operação concluida com sucesso
            $user->delete();

            // Retorna uma resposta de sucesso
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Usuário deletado com sucesso',
                ],
                200,
            );
        } catch (Exception $e) {
            // Operação não é concluida com exito
            // Retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => $e->getMessage(),
                ],
                400,
            );
        }
    }
}

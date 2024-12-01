<?php

namespace App\Http\Controllers\api;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;

class TaskController extends Controller
{
    /**
     * Retorna todas as tarefas.
     *
     * Este método retorna todas as tarefas existentes no banco de dados.
     * A resposta será uma lista de tarefas em formato JSON.
     *
     * @return \Illuminate\Http\JsonResponse Resposta JSON com a lista de tarefas.
     */
    public function index(): JsonResponse
    {
        $tasks = Task::orderBy('id', 'DESC')->get(); // Retorna todas as tarefas

        return response()->json(
            [
                'status' => true,
                'tasks' => $tasks,
            ],
            200,
        );
    }

    /**
     * Retorna uma tarefa específica
     *
     * Este método retorna uma tarefa específica do banco de dados.
     * A resposta será uma tarefa em formato JSON.
     *
     * @param Task $task O modelo da tarefa a ser retornada
     * @return \Illuminate\Http\JsonResponse Resposta JSON com a tarefa encontrada.
     */
    public function show(Task $task): JsonResponse
    {
        // verifica se existe a tarefa
        if (!$task) {
            // Retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Tarefa nao encontrada!',
                ],
                404,
            );
        }
        // Retorna uma resposta de sucesso
        return response()->json(
            [
                'status' => true,
                'task' => $task,
            ],
            200,
        );
    }

    /**
     * Cria uma nova tarefa
     *
     * Este método cria uma nova tarefa com base nos dados enviados
     * na requisição e retorna como uma resposta JSON.
     *
     * @param TaskRequest $request A solicitação contendo os dados para criar a tarefa
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo a tarefa criada
     */
    public function store(TaskRequest $request): JsonResponse
    {
        // Inicia a transação
        DB::beginTransaction();

        try {
            $task = Task::create($request->all());

            // Operação concluida com sucesso
            DB::commit();

            // Retorna uma resposta de sucesso
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Tarefa criada com sucesso!',
                    'task' => $task,
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
     * Atualiza uma tarefa
     *
     * Este método atualiza uma tarefa com base nos dados enviados
     * na requisição e retorna como uma resposta JSON.
     *
     * @param TaskRequest $request A solicitação contendo os dados para atualizar a tarefa
     * @param User $user O modelo do tarefa a ser atualizado
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo a tarefa atualizada
     */
    public function updateStatus(TaskRequest $request, Task $task): JsonResponse
    {
        // verifica se existe a tarefa
        if (!$task) {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Tarefa nao encontrada!',
                ],
                404,
            );
        }

        // Verifica se o status da tarefa foi alterado
        if ($task->status == $request['status']) {
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Status da tarefa atualizado com sucesso!',
                ],
                200,
            );
        }
       
        // Inicia a transação
        DB::beginTransaction();
       
        try {
            if ($request->status == 'pendente') {
                $task->markAsIncomplete(); // Marca a tarefa como pendente
            } else {
                $task->markAsCompleted(); // Marca a tarefa como concluída
            }

            $task->update([
                'status' => $request['status'],
            ]);
            // Operação concluida com sucesso
            DB::commit();

            // Retorna uma resposta de sucesso
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Status da tarefa atualizado com sucesso!',
                    'task' => $task,
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
     * Deleta uma tarefa
     *
     * Este método deleta uma tarefa e retorna uma resposta JSON
     * indicando o status da operação.
     *
     * @param Task $task O modelo da tarefa a ser deletada
     * @return \Illuminate\Http\JsonResponse Resposta JSON contendo o status da operação
     */
    public function destroy(Task $task): JsonResponse
    {
        // Verifica se a tarefa existe
        if (!$task) {
            // Retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Tarefa não encontrada!',
                ],
                404,
            );
        }

        try {
            // Tenta deletar a tarefa
            $task->delete();

            // Retorna uma resposta de sucesso
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Tarefa excluída com sucesso!',
                ],
                200,
            );
        } catch (Exception $e) {
            // Em caso de exceção, retorna uma resposta de erro
            return response()->json(
                [
                    'status' => false,
                    'message' => $e->getMessage(),
                ],
                500,
            );
        }
    }
}

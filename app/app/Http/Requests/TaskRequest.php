<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determina se o usuário está autorizado a fazer essa requisição.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Manipular falha de validação e retornar uma resposta de erro JSON com os erros de validação.
     * 
     * @param Validator $valdator $validator o objeto de validador da requisição
     * @throws HttpResponseException
     */
    protected function failedValidation(Validator $validator){

        throw new HttpResponseException(response()->json([
            'status' => false,
            'errors' => $validator->errors(),
        ], 422));
    }

    /**
     * Recebe as regras de validação para os campos do formulário
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Validação condicional: Título obrigatório apenas na criação
        $titleRule = $this->isMethod('put') ? 'nullable|string|max:255' : 'required|string|max:255';


        return [
            'title' => $titleRule,  // Título da tarefa é obrigatório e deve ter no máximo 255 caracteres
            'status' => 'required|in:pendente,concluída',  // Status da tarefa é obrigatório e deve ser 'pendente' ou 'concluída'
        ];
    }

    /**
     * Retorna as mensagens de erro personalizadas para as regras de validação
     * 
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.required' => 'O título da tarefa é obrigatório.',
            'title.max' => 'O título da tarefa deve ter no máximo 255 caracteres.',
            'status.required' => 'O status da tarefa é obrigatório.',
            'status.in' => 'O status da tarefa deve ser "pendente" ou "concluída".',
        ];
    }

}

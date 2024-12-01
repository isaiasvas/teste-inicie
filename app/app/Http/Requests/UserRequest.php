<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
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
        $userID = $this->route('user');
       
        // Validação condicional: Senha obrigatória apenas na criação
        $passwordRule = $this->isMethod('put') ? 'nullable|min:6' : 'required|min:6';

        // Validação condicional: Email obrigatório apenas na criação
        $emailRule = $this->isMethod('put') ? 'nullable|email|unique:users,email,' . ($userID ? $userID->id : null) : 'required|email|unique:users,email';

        return [
            'name' => 'required|min:2',
            'email' => $emailRule,
            'password' => $passwordRule,
        ];
    }

    /**
     * Retorna as mensagens de erro personalizadas para as regras de validação
     * 
     * @return array
     */
    public function messages() : array
    {
        return [
            'name.required' => 'O campo nome e obrigatorio',
            'name.min' => 'O campo nome deve ter no minimo :min caracteres',
            'email.required' => 'O campo email e obrigatorio',
            'email.email' => 'O campo email deve ser um email valido',
            'email.unique' => 'O email informado ja esta em uso',
            'password.required' => 'O campo senha e obrigatorio',
            'password.min' => 'O campo senha deve ter no minimo :min caracteres',
        ];
    }
}

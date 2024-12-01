<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    /**
     * O nome da tabela associada ao modelo.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * Os atributos que podem ser atribuídos em massa.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'status',
        'completed_at',
    ];


    /**
     * Os atributos que devem ser ocultos para o array.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];


    /**
     * Os atributos que devem ser convertidos para tipos nativos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed_at' => 'datetime',
    ];

 
    /**
     * Marca a tarefa como concluída.
     *
     * @return boolean
     */
    public function markAsCompleted()
    {
        $this->update(['completed_at' => now()]);
    }

    /**
     * Marca a tarefa como "incompleta".
     *
     * @return boolean
     */
    public function markAsIncomplete()
    {
        $this->update(['completed_at' => null]);
    }
}

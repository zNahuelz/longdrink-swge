<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $primaryKey = 'cod_usuario';

    protected $fillable = [
        'nombre_usuario',
        'contrasena',
        'email',
        'activo',
        'cod_rol'
    ];

    protected $hidden = [
        'contrasena'
    ];

    protected $casts = [
        'contrasena' => 'hashed'
    ];

    //JWT...

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'nombre_usuario' => $this->nombre_usuario,
            'email' => $this->email,
            'activo' => $this->activo,
            'cod_rol' => $this->cod_rol //Cambiar por tipo de rol directamente una vez asignadas relaciones.
        ];
    }
}

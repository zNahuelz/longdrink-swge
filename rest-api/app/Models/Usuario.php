<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
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
        'password',
        'email',
        'activo',
        'cod_rol'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'password' => 'hashed'
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

    //Relations ...

    public function rol() : BelongsTo
    {
        return $this->belongsTo(Rol::class, 'cod_rol', 'cod_rol');
    }

    public function alumno(): HasOne
    {
        return $this->hasOne(Alumno::class,'cod_usuario', 'cod_usuario');
    }

    public function profesor() : HasOne
    {
        return $this->hasOne(Profesor::class,'cod_usuario', 'cod_usuario');
    }

}

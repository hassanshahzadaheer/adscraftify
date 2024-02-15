<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Website extends Model
{

    use HasFactory;
    protected $fillable = [
        'customer_id',
        'url',
        'alexa_rank',
        'country',
    ];
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id')->withDefault();
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }
}

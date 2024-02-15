<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{

    use HasFactory;
    protected $fillable = [
        'user_id',
        'website_id',
        'date',
        'ad_requests',
        'fill_rate',
        'ad_impressions',
        'clicks',
        'ctr',
        'ecpm',
        'revenue',
    ];

}

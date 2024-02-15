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
    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Website model
    public function website()
    {
        return $this->belongsTo(Website::class);
    }


}

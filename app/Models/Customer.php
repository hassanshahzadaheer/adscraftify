<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**¡≤
 *
 */
class Customer extends Model
{
    protected $fillable =
        [
            'user_id',
            'contact',
            'skypeWhatsApp',
            'domain',
            'pageViewsPerDay',
        ];

    use HasFactory;

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}

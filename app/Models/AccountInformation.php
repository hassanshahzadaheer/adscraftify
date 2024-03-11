<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
class AccountInformation extends Model
{
    use HasFactory;
    protected $fillable = [
        'paypal',
        'pioneer_beneficiary_name',
        'account_number',
        'swift_code',
        'iban_number',
        'bank_name',
        'beneficiary_address',
        'postal_code',
        'amount',
        'currency',
        'date_of_birth',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

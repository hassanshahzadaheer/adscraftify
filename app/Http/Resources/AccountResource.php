<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'user_email' => $this->user->email,
            'paypal' => $this->paypal,
            'pioneer_beneficiary_name' => $this->pioneer_beneficiary_name,
            'account_number' => $this->account_number,
            'swift_code' => $this->swift_code,
            'iban_number' => $this->iban_number,
            'bank_name' => $this->bank_name,
            'beneficiary_address' => $this->beneficiary_address,
            'postal_code' => $this->postal_code,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'date_of_birth' => $this->date_of_birth,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccountInformationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|integer',
            'paypal' => 'nullable|string|max:255',
            'pioneer_beneficiary_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:255',
            'swift_code' => 'nullable|string|max:255',
            'iban_number' => 'nullable|string|max:255',
            'bank_name' => 'nullable|string|max:255',
            'beneficiary_address' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'amount' => 'nullable|numeric',
            'currency' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
        ];
    }
}

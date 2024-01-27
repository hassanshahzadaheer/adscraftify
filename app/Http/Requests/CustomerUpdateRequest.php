<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerUpdateRequest extends FormRequest
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
//            users table validation
            'username' => 'required|string|max:255',
            'email' => 'required|email',

//            customer table validation
            'contact' => 'required|string|max:255',
            'skypeWhatsApp' => 'required|string|max:255',
            'domain' => 'required|string|max:255',
            'pageViewsPerDay' => 'required|integer',

        ];
    }
}

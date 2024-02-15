<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReportRequest extends FormRequest
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
            'website_id' => 'required|integer',
            'date' => 'required|date',
            'ad_requests' => 'required|integer',
            'fill_rate' => 'required|numeric',
            'ad_impressions' => 'required|integer',
            'clicks' => 'required|integer',
            'ctr' => 'required|numeric',
            'ecpm' => 'required|numeric',
            'revenue' => 'required|numeric',
        ];
    }
}

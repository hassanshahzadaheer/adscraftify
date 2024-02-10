<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource
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
            'website_id' => $this->website_id,
            'date' => $this->date,
            'ad_requests' => $this->ad_requests,
            'fill_rate' => $this->fill_rate,
            'ad_impressions' => $this->ad_impressions,
            'clicks' => $this->clicks,
            'ctr' => $this->ctr,
            'ecpm' => $this->ecpm,
            'revenue' => $this->revenue,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

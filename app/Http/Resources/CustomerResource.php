<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            'user' => $this->user,
            'contact' => $this->contact,
            'skypeWhatsApp' => $this->skypeWhatsApp,
            'domain' => $this->domain,
            'pageViewsPerDay' => $this->pageViewsPerDay,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}

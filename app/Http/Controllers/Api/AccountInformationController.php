<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountInformationRequest;
use App\Http\Requests\UpdateAccountInformationRequest;
use App\Models\AccountInformation;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\AccountResource;

class AccountInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all account information records with their associated user
        $accountInformation = AccountInformation::with('user')->orderBy('id', 'desc')->paginate(5);
        // Return a collection of account information resources
        return AccountResource::collection($accountInformation);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAccountInformationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAccountInformationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AccountInformation  $accountInformation
     * @return \Illuminate\Http\Response
     */
    public function show(AccountInformation $accountInformation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAccountInformationRequest  $request
     * @param  \App\Models\AccountInformation  $accountInformation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAccountInformationRequest $request, AccountInformation $accountInformation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccountInformation  $accountInformation
     * @return \Illuminate\Http\Response
     */
    public function destroy(AccountInformation $accountInformation)
    {
        //
    }
}

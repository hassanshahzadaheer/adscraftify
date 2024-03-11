<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountInformationRequest;
use App\Http\Requests\UpdateAccountInformationRequest;
use App\Models\AccountInformation;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\AccountResource;
use Illuminate\Support\Facades\DB;


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
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data
            $validatedData = $request->validated();

            // Create a new account information record using the validated data
            $accountInformation = AccountInformation::create($validatedData);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the created account information using the resource
            return new AccountResource($accountInformation);
        } catch (ValidationException $e) {
            // Rollback the transaction on validation failure
            DB::rollBack();

            return response()->json(['error' => 'Validation error', 'details' => $e->errors()],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        } catch (QueryException $e) {
            // Rollback the transaction in case of a database-related error
            DB::rollBack();

            return response()->json(['error' => 'Database error', 'details' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an exception
            DB::rollBack();

            // Handle other exceptions
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
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
    public function update(UpdateAccountInformationRequest $request, $id)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data using the UpdateAccountInformationRequest
            $validatedData = $request->validated();

            // Find the account information by ID
            $accountInformation = AccountInformation::findOrFail($id);

            // Update the account information
            $accountInformation->update($validatedData);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the updated account information using the resource
            return new AccountResource($accountInformation);
        } catch (QueryException $e) {
            // Handle database-related errors
            DB::rollBack();
            return response()->json(['error' => 'Database error', 'details' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Handle other exceptions
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AccountInformation  $accountInformation
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            // Retrieve the account information by id
            $accountInformation = AccountInformation::find($id);

            // Check if the account information exists
            if ($accountInformation) {
                // Delete the account information
                $accountInformation->delete();

                // Return a success response
                return response()->json(['message' => 'Account information deleted successfully'], JsonResponse::HTTP_OK);
            } else {
                // Handle non-existing account information
                return response()->json(['error' => 'Account information not found'], JsonResponse::HTTP_NOT_FOUND);
            }
        } catch (QueryException $e) {
            // Handle database-related errors
            return response()->json(['error' => 'Database error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => 'Something went wrong'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



}

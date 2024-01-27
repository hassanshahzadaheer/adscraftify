<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::with('user')->orderBy('id', 'desc')->paginate(10);

        return CustomerResource::collection($customers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(CustomerStoreRequest $request)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data using the CustomerStoreRequest
            $validatedCustomerData = $request->validated();

            // Create a new user using the validated user data
            $user = User::create([
                'name' => $validatedCustomerData['username'],
                'email' => $validatedCustomerData['email'],
                'password' => bcrypt($validatedCustomerData['password']),
            ]);

            // Create a new customer associated with the user
            $customer = Customer::create([
                'user_id' => $user->id,
                'contact' => $validatedCustomerData['contact'],
                'skypeWhatsApp' => $validatedCustomerData['skypeWhatsApp'],
                'domain' => $validatedCustomerData['domain'],
                'pageViewsPerDay' => $validatedCustomerData['pageViewsPerDay'],
            ]);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the created customer using the resource
            return new CustomerResource($customer);
        } catch (QueryException $e) {
            // Rollback the transaction in case of an exception
            DB::rollBack();

            // Handle database-related errors
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(CustomerUpdateRequest $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(CustomerUpdateRequest $request, $id)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data using the CustomerUpdateRequest
            $validatedData = $request->validated();

            // Find the customer by ID
            $customer = Customer::find($id);

            if (!$customer) {
                // Rollback the transaction if the customer is not found
                DB::rollBack();
                return response()->json(['error' => 'Customer not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            // Update user information
            $customer->user->update([
                'name' => $validatedData['username'],
                'email' => $validatedData['email'],
            ]);

            // Update customer information
            $customer->update([
                'contact' => $validatedData['contact'],
                'skypeWhatsApp' => $validatedData['skypeWhatsApp'],
                'domain' => $validatedData['domain'],
                'pageViewsPerDay' => $validatedData['pageViewsPerDay'],
            ]);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the updated customer using the resource
            return new CustomerResource($customer);
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
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        try {
            // Delete the customer
            $customer->delete();
            // Return a success response
            return response()->json(['message' => 'Customer deleted successfully'], JsonResponse::HTTP_OK);
        } catch (QueryException $e) {
            // Handle database-related errors
            return response()->json(['error' => 'Database error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => 'Something went wrong'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

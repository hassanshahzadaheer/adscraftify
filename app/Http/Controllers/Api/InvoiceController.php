<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Models\Invoice;
use App\Models\Customer;
use App\Http\Resources\InvoiceResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all invoices with their associated user
        $invoices = Invoice::with('user')->orderBy('id', 'desc')->paginate(5);

        // Return a collection of invoice resources
        return InvoiceResource::collection($invoices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreInvoiceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInvoiceRequest $request)
    {

        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data
            $validatedData = $request->validated();

            // Create a new invoice using the validated data
            $invoice = Invoice::create($validatedData);

            // Assuming the customer_id is in the request data
            $customer_id = $request->input('customer_id');

            // Find the customer
            $customer = Customer::find($customer_id);

            // If the customer exists, associate it with the invoice
            if ($customer) {
                $invoice->customer()->associate($customer);
                $invoice->save();
            }

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the created invoice using the resource
            return new InvoiceResource($invoice);
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

            // Handle exceptions
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInvoiceRequest  $request
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInvoiceRequest $request, $id)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data
            $validatedData = $request->validated();

            // Find the invoice by ID
            $invoice = Invoice::findOrFail($id);

            // Update the invoice information
            $invoice->update($validatedData);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the updated invoice using the resource
            return new InvoiceResource($invoice);
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
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Delete the invoice
            $invoice->delete();

            // Commit the transaction if everything is successful
            DB::commit();

            // Return a success response
            return response()->json(['message' => 'Invoice deleted successfully'], JsonResponse::HTTP_OK);
        } catch (QueryException $e) {
            // Handle database-related errors
            DB::rollBack();
            return response()->json(['error' => 'Database error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Handle other exceptions
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

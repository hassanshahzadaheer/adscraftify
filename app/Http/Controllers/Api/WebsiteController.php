<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWebsitesRequest;
use App\Http\Requests\UpdateWebsitesRequest;
use App\Http\Resources\WebsiteResource;
use App\Models\Website;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $websites = Website::with('customer')->orderBy('id', 'desc')->paginate(10);
        return WebsiteResource::collection($websites);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreWebsitesRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreWebsitesRequest $request)
    {

        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data using the StoreWebsitesRequest
            $validatedWebsiteData = $request->validated();

            // Create a new website using the validated data
            $website = Website::create([
                'customer_id' => $validatedWebsiteData['customer_id'],
                'url' => $validatedWebsiteData['url'],
                'alexa_rank' => $validatedWebsiteData['alexa_rank'],
                'country' => $validatedWebsiteData['country'],
            ]);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the created website using the resource
            return new WebsiteResource($website);
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
            // Rollback the transaction in case of other exceptions
            DB::rollBack();

            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWebsitesRequest  $request
     * @param  \App\Models\Website  $websites
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWebsitesRequest $request, Website $website)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data using the UpdateWebsitesRequest
            $validatedData = $request->validated();

            // Update the website information
            $website->update([
                'url' => $validatedData['url'],
                'alexa_rank' => $validatedData['alexa_rank'],
                'country' => $validatedData['country'],
            ]);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the updated website using the resource
            return new WebsiteResource($website);
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
     * @param  \App\Models\Website  $websites
     * @return \Illuminate\Http\Response
     */
    public function destroy(Website $website)
    {
        try {
            // Delete the website
            $website->delete();
            // Return a success response
            return response()->json(['message' => 'Website deleted successfully'], JsonResponse::HTTP_OK);
        } catch (QueryException $e) {
            // Handle database-related errors
            return response()->json(['error' => 'Database error'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['error' => 'Something went wrong'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}

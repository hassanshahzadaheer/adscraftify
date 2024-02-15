<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Http\Resources\ReportResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Report;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all reports with their associated user and website
        $reports = Report::with('user', 'website')->get();

        // Return a collection of report resources
        return ReportResource::collection($reports);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreReportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreReportRequest $request)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data (you can use your validation logic here)
            $validatedData = $request->Validated();

            // Create a new report using the validated data
            $report = Report::create($validatedData);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the created report using the resource
            return new ReportResource($report);
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
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateReportRequest  $request
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReportRequest $request, $id)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Validate the request data using the UpdateReportRequest
            $validatedData = $request->validated();

            // Find the report by ID
            $report = Report::findOrFail($id);

            // Update the report information
            $report->update($validatedData);

            // Commit the transaction if everything is successful
            DB::commit();

            // Return the updated report using the resource
            return new ReportResource($report);
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
     * @param  \App\Models\Report  $report
     * @return \Illuminate\Http\Response
     */
    public function destroy(Report $report)
    {
        try {
            // Start a database transaction
            DB::beginTransaction();

            // Delete the report
            $report->delete();

            // Commit the transaction if everything is successful
            DB::commit();

            // Return a success response
            return response()->json(['message' => 'Report deleted successfully'], JsonResponse::HTTP_OK);
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

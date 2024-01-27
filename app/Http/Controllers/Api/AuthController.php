<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {

        try {
            $data = $request->validated();

            // Create a new user in the database using the validated data
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);

            // Generate an authentication token for the newly created user
            $token = $user->createToken('main')->plainTextToken;

            // Return a response containing user information and the generated token
            return response([
                'user' => $user,
                'token' => $token,
            ]);
        }  catch (\Exception $e) {
            // Handle other exceptions
            return response([
                'error' => 'Failed to create user. ' . $e->getMessage(),
            ], 500);
        }
    }



    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();

            // Attempt to authenticate the user
            if (Auth::attempt($credentials)) {
                // Authentication successful
                $user = Auth::user();
                $token = $user->createToken('main')->plainTextToken;

                // Return a response containing user information and the generated token
                return response()->json([
                    'user' => $user,
                    'token' => $token,
                ]);
            }

            // Authentication failed
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials. Please enter the correct email or password.'],
            ]);
        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'errors' => [
                    'message' => 'Invalid credentials. Please enter the correct email or password.',
                    'fields' => $e->errors(),
                ],
            ], $e->status);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json([
                'errors' => [
                    'message' => 'Failed to log in.',
                    'exception' => $e->getMessage(),
                ],
            ], 500);
        }
    }

    public function logout(Request $request)
{
    try {
        // Retrieve the currently authenticated user
        $user = $request->user();
        // Revoke (delete) the current access token
        $user->currentAccessToken()->delete();

        // Return a response indicating successful logout
        return response()->json(['message' => 'Successfully logged out']);
    } catch (\Exception $e) {
        // Log the error for further investigation

        Log::error('Logout error: ' . $e->getMessage());

        // Return a generic error response
        return response()->json(['error' => 'Unable to log out. Please try again.'], 500);
    }
}
}

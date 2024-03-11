<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AccountInformation;

class AccountInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'user_id' => 1,
                'paypal' => 'user1_paypal@example.com',
                'pioneer_beneficiary_name' => 'User 1 Beneficiary',
                'account_number' => '123456789',
                'swift_code' => 'SWFT1234',
                'iban_number' => 'IBAN1234',
                'bank_name' => 'Bank of Example',
                'beneficiary_address' => '123 Example St, City, Country',
                'postal_code' => '12345',
                'amount' => 1000.50,
                'currency' => 'USD',
                'date_of_birth' => '1990-01-01',
            ],
            [
                'user_id' => 2,
                'paypal' => 'user2_paypal@example.com',
                'pioneer_beneficiary_name' => 'User 2 Beneficiary',
                'account_number' => '987654321',
                'swift_code' => 'SWFT9876',
                'iban_number' => 'IBAN9876',
                'bank_name' => 'Bank of Sample',
                'beneficiary_address' => '456 Sample Rd, City, Country',
                'postal_code' => '67890',
                'amount' => 2000.75,
                'currency' => 'EUR',
                'date_of_birth' => '1985-05-15',
                ]
            ];

        // Insert the data into the account_information table
        foreach ($data as $record) {
            AccountInformation::create($record);
        }
    }
}

<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $users = [
        	[
        		'name' =>  'Victor Pino',
        		'email' => 'victopin0@gmail.com',
        		'password' => Hash::make('1234')

        	]
        ];

        foreach ($users as $user) {
        	# code...
        	\App\User::create($user);
        	
        }
    }
}

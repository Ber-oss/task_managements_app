<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        
        return [
            'name'=>['required','min:2','max:100'],
            'description'=>['nullable','min:2'],
            'start_date'=>['required','date'],
            'end_date'=>['required','date','after:start_date'],
            'status'=>['sometimes','in:pending,processing,completed']
        ];
    }
}

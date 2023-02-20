<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
        
        $unique_rule=$this->route('project')
        ?Rule::unique('projects')->ignore($this->route('project')['id'])
        :Rule::unique('projects');

        $unique_rule=$unique_rule ->where(function ($query){
            return $query->where('user_id', auth()->user()->id);
        });

        return [
            'name'=>['required','min:2','max:100',$unique_rule],
            'description'=>['nullable','min:2'],
        ];
    }
}

<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\DTO\FormDTO;
use HelpGent\App\Models\Form;

class FormRepository {
    public function get() {
        return Form::query()->get();
    }

    public function create( FormDTO $form_dto ) {
        return Form::query()->insert_get_id(
            [
                'title'      => $form_dto->get_title(),
                'status'     => $form_dto->get_status(),
                'content'    => $form_dto->get_content(),
                'created_by' => $form_dto->get_created_by()
            ]
        );
    }
}
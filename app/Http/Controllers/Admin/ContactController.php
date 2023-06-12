<?php

namespace HelpGent\App\Http\Controllers\Admin;

use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\ContactRepository;
use HelpGent\WaxFramework\Routing\Response;

class ContactController extends Controller {
    public ContactRepository $contact_repository;

    public function __construct( ContactRepository $contact_repository ) {
        $this->contact_repository = $contact_repository;
    }

    public function index() {
        return Response::send(
            [
                'contacts' => $this->contact_repository->get()
            ]
        );
    }
}
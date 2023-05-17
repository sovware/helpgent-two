<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\TagDTO;
use HelpGent\App\Models\Tag;
use HelpGent\App\Utils\DateTime;

class TagRepository {
    public function get() {
        return Tag::query()->with( 'user' )->get();
    }

    public function create( TagDTO $tag_dto ) {

        $tag = $this->first_by_title( $tag_dto->get_title() );

        if ( $tag ) {
            throw new Exception( sprintf( esc_html__( '%s tag is already exists', 'helpgent' ), $tag_dto->get_title() ), 500 );
        }

        return Tag::query()->insert_get_id(
            [
                'title'      => $tag_dto->get_title(),
                'created_by' => $tag_dto->get_created_by()
            ]
        );
    }

    public function update( TagDTO $tag_dto ) {

        $tag = $this->get_by_id( $tag_dto->get_id() );

        if ( ! $tag ) {
            throw new Exception( esc_html__( 'Tag not found', 'helpgent' ), 404 );
        }

        $tag = $this->first_by_title( $tag_dto->get_title() );

        if ( $tag && $tag->id != $tag_dto->get_id() ) {
            throw new Exception( sprintf( esc_html__( '%s tag is already exists', 'helpgent' ), $tag_dto->get_title() ), 500 );
        }

        return Tag::query()->where( 'id', $tag_dto->get_id() )->update(
            [
                'title'      => $tag_dto->get_title(),
                'updated_at' => DateTime::now()
            ]
        );
    }

    public function delete( int $id ) {
        $tag = $this->get_by_id( $id );

        if ( ! $tag ) {
            throw new Exception( esc_html__( 'Tag not found', 'helpgent' ), 404 );
        }

        return Tag::query()->where( 'id', $id )->delete();
    }

    public function first_by_title( string $title ) {
        return Tag::query()->where( 'title', $title )->first();
    }

    public function get_by_id( int $id ) {
        return Tag::query()->where( 'id', $id )->first();
    }
}
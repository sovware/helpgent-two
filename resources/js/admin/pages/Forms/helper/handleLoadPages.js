import dataFetcher from '../../../../lib/fetchData';

export default async function handleLoadPages ( inputValue ) {
    const availablePages = await dataFetcher(
        `/helpgent/admin/page/?search=${ inputValue }`
    );

    const availableOptions = availablePages.pages.map(
        ( { id, title } ) => ( {
            value: id,
            label: title,
        } )
    );

    return availableOptions;
};

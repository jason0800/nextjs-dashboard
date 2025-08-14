'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // reads current URL search parameters
  const pathname = usePathname(); // gets current path
  const { replace } = useRouter(); // programatically changes URL

  const handleSearch = useDebouncedCallback((term) => { // term is from the input field
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams); // mutable copy of the current query parameters.
    params.set('page', '1')
    if (term) {
      params.set('query', term); // ?query=whatever+is+typed+here (non-string)
    } else {
      params.delete('query');
    }
    console.log("params.toString(): ", params.toString())
    replace(`${pathname}?${params.toString()}`); // /dashboard/invoices/?query=whatever+is+typed+here
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

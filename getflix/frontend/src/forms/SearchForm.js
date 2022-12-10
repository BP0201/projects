import React, { useState } from "react";

function SearchForm({ searchFor }) {
  // console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  // handle form submission
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  // handle input value change
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit} data-testid="search-form">
          <div className="input-group col-12">
            <input
              type="text"
              className="form-control flex-grow-1"
              name="searchTerm"
              placeholder='Type here'
              value={searchTerm}
              onChange={handleChange}
              data-testid="search-form-input"
            />
            <div className="input-group-append">
              <button data-testid="search-form-btn" className="btn btn-outline-info" type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
  );
}

export default SearchForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchWidget = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (isSearchVisible) {
      if (searchText.trim()) {
        navigate(`/catalog?search=${searchText}`);
      } else {
        setSearchVisible(false);
      }
    } else {
      setSearchVisible(true);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchText.trim()) {
        navigate(`/catalog?search=${searchText}`);
      }
    }
  };

  return (
    <div className="header-controls">
      <div
        className="header-controls-pic header-controls-search"
        data-id="search-expander"
        onClick={handleSearchClick}
      ></div>
      {isSearchVisible && (
        <form
          data-id="search-form"
          className="header-controls-search-form form-inline"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default SearchWidget;

import React from "react";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  genres = [
    "All","Sci-Fi","Comedy","Drama","Thriller",
    "Animation","Biography","Adventure","Crime","Fantasy"
  ],
}) => {
  return (
    <div className="toolbar">
      <div className="field">🔎
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title"
        />
      </div>
      <div className="field">🎯
        <select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

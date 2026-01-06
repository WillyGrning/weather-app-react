// export default function SearchBar({ onSearch }) {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const city = e.target.city.value.trim();
//         if (city) {
//             onSearch(city);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="city"
//                 placeholder="Masukkan nama kota"
//             />
//             <button type="submit">Cari</button>
//         </form>
//     );
// }
export default function SearchBar({ value, onChange, onSubmit, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && value.trim() && !loading) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Cari nama kota…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="search-input"
        />
        <button
          onClick={handleClick}
          disabled={loading || !value.trim()}
          className="search-button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

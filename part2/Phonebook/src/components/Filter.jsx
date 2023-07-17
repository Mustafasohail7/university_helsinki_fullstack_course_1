const Filter = ({searchText,handleSearch}) => {
  return (
    <div>
        filter shown with <input value={searchText} onChange={handleSearch} />
    </div>
  )
}

export default Filter

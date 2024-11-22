import React, { useState, useEffect } from "react";
import Select from "react-select";

const PetFilter = () => {
  // Initialize the state with data from localStorage or empty arrays
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters ? JSON.parse(savedFilters) : {
      size: [],
      gender: [],
      age: [],
      location: [],
      petType: [],
    };
  });

  const petTypeOptions = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
  ];

  const locationOptions = [
    { value: 'new_york', label: 'New York' },
    { value: 'los_angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const ageOptions = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Adult', label: 'Adult' },
    { value: 'Senior', label: 'Senior' },
  ];

  // Effect to save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleFilterChange = (selectedOptions, filterName) => {
    const newValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: Array.from(new Set([...prevFilters[filterName], ...newValues])), // Prevent duplicates
    }));
  };

  const handleRemoveFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName].filter((item) => item !== value),
    }));
  };

  const getPlaceholder = (baseText, filterName) => {
    const count = filters[filterName].length;
    return count > 0 ? `${baseText} (${count})` : baseText;
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div className="w-full">
          <Select
            isMulti
            options={locationOptions}
            placeholder={getPlaceholder("Location", "location")}
            onChange={(selected) => handleFilterChange(selected, "location")}
            value={null}
            closeMenuOnSelect={false}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: "30px",
                padding: "5px",
                backgroundColor: "#E7E7D6",
                color: "#071327",
                fontSize: "14px",
                fontWeight: "300",
                borderColor: state.isFocused ? "#809309" : "#071327",
                boxShadow: "none",
                outline: "none",
                cursor: "default",
                transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#071327",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#071327",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#071327",
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#809309",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: "#071327",
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: "#FF0000",
              }),
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pet Type */}
          <div>
            <Select
              isMulti
              isSearchable={false}
              options={petTypeOptions}
              placeholder={getPlaceholder("Pet type", "petType")}
              onChange={(selected) => handleFilterChange(selected, "petType")}
              value={null}
              closeMenuOnSelect={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "30px",
                  padding: "5px",
                  backgroundColor: "#E7E7D6",
                  color: "#071327",
                  fontSize: "14px",
                  fontWeight: "300",
                  borderColor: state.isFocused ? "#809309" : "#071327",
                  boxShadow: state.isFocused ? `0 0 0 1px #809309` : "none",
                  outline: "none",
                  cursor: "default",
                  transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#071327",
                  hover: "none",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "#071327",
                }),
              }}
            />
          </div>

          {/* Size */}
          <div>
            <Select
              isMulti
              options={sizeOptions}
              placeholder={getPlaceholder("Size", "size")}
              onChange={(selected) => handleFilterChange(selected, "size")}
              value={null}
              closeMenuOnSelect={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "30px",
                  padding: "5px",
                  backgroundColor: "#E7E7D6",
                  color: "#071327",
                  fontSize: "14px",
                  fontWeight: "300",
                  borderColor: state.isFocused ? "#809309" : "#071327",
                  boxShadow: state.isFocused ? `0 0 0 1px #809309` : "none",
                  outline: "none",
                  cursor: "default",
                  transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#071327",
                  hover: "none",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "#071327",
                }),
              }}
            />
          </div>

          {/* Gender */}
          <div>
            <Select
              isMulti
              options={genderOptions}
              placeholder={getPlaceholder("Gender", "gender")}
              onChange={(selected) => handleFilterChange(selected, "gender")}
              value={null}
              closeMenuOnSelect={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "30px",
                  padding: "5px",
                  backgroundColor: "#E7E7D6",
                  color: "#071327",
                  fontSize: "14px",
                  fontWeight: "300",
                  borderColor: state.isFocused ? "#809309" : "#071327",
                  boxShadow: state.isFocused ? `0 0 0 1px #809309` : "none",
                  outline: "none",
                  cursor: "default",
                  transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#071327",
                  hover: "none",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "#071327",
                }),
              }}
            />
          </div>

          {/* Age */}
          <div>
            <Select
              isMulti
              options={ageOptions}
              placeholder={getPlaceholder("Age", "age")}
              onChange={(selected) => handleFilterChange(selected, "age")}
              value={null}
              closeMenuOnSelect={false}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderRadius: "30px",
                  padding: "5px",
                  backgroundColor: "#E7E7D6",
                  color: "#071327",
                  fontSize: "14px",
                  fontWeight: "300",
                  borderColor: state.isFocused ? "#809309" : "#071327",
                  boxShadow: state.isFocused ? `0 0 0 1px #809309` : "none",
                  outline: "none",
                  cursor: "default",
                  transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#071327",
                  hover: "none",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "#071327",
                }),
              }}
            />
          </div>
        </div>
      </div>

      {/* Chosen filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(filters).map((filterName) =>
          filters[filterName].map((filterValue) => {
            const option =
              filterName === "size"
                ? sizeOptions.find((opt) => opt.value === filterValue)
                : filterName === "gender"
                ? genderOptions.find((opt) => opt.value === filterValue)
                : filterName === "age"
                ? ageOptions.find((opt) => opt.value === filterValue)
                : filterName === "location"
                ? locationOptions.find((opt) => opt.value === filterValue)
                : filterName === "petType"
                ? petTypeOptions.find((opt) => opt.value === filterValue)
                : null;

            return (
              <div
                key={`${filterName}-${filterValue}`}
                className="bg-[#E6F3D5] text-[#809309] px-4 py-2 rounded-full flex items-center gap-2"
              >
                <span>{option?.label}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFilter(filterName, filterValue)}
                >
                  &#10005;
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* btn */}
      <div className="mt-4 flex justify-start gap-4">
        <button className="bg-[#809309] text-white px-6 py-2 rounded-full hover:bg-[#6f7e28]">
          Apply Filter
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={() => {
            setFilters({ size: [], gender: [], age: [], location: [], petType: [] });
            localStorage.removeItem("filters");
          }}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default PetFilter;

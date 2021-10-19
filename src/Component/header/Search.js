import React, { useState, useEffect } from "react";
import { SEARCH } from "../../gql/user";
import { useQuery } from "@apollo/client";
import { Search as SearchSU } from "semantic-ui-react";
import imgNoFound from "../../assets/png/avatar.png";
import { Link } from "react-router-dom";

export const Search = () => {
  const [search, setSearch] = useState(null);
  const [resultSearch, setResultSearch] = useState([]);

  const { data, loading } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      const users = data.search.map((s) => ({
        title: s.name,
        username: s.userName,
        avatar: s.avatar,
        key: s.email,
      }));
      setResultSearch(users);
    }
  }, [data]);

  const handleResults = () => {
    setSearch(null);
    setResultSearch([]);
  };

  return (
    <>
      <SearchSU
        className="searchSu"
        fluid
        input={{ icon: "search", iconPosition: "left" }}
        onSearchChange={(e) => {
          e.target.value ? setSearch(e.target.value) : setSearch(null);
        }}
        loading={loading}
        results={resultSearch}
        resultRenderer={(e) => <ModalSearch data={e} />}
        value={search || ""}
        onResultSelect={handleResults}
      />
    </>
  );
};

const ModalSearch = ({ data }) => {
  return (
    <>
      <Link to={data.username}>
        <div className="contentSearch">
          <div className="contentSearch__imagen">
            <img
              className="main__image content__image"
              src={data.avatar ? data.avatar : imgNoFound}
              alt="avatar"
            />
          </div>
          <div className="contentSearch__imagen">
            <h6 className="contentSearch__text">{data.title}</h6>
            <h6 className="contentSearch__text--2">{data.username}</h6>
          </div>
        </div>
      </Link>
    </>
  );
};

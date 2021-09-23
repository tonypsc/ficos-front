import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Shared/Header";
import SearchBox from "../Shared/SearchBox";
import UserList from "./UserList";
import { fetchData } from "../Shared/helpers/fetchHelper";
import Pagination from "../Shared/Pagination";
import config from "../Shared/config/general";
import Alert from "../Shared/Alert";
import Loading from "../Shared/Loading";
import swal from "sweetalert";

export default function User() {
  const [search, setSearch] = useState("");
  const [searchTemp, setSearchTemp] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const url = `${config.apiUrl}users?search=${search}&page=${page}&limit=${config.itemsPerPage}`;

    const result = await fetchData(url);

    if (result?.status !== "success") {
      setError(result.errors);
    } else {
      setTotalRecords(result.data.total);
      setData(result.data.users);
    }
  };

  function handleChange(e) {
    setSearchTemp(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearch(searchTemp);
  }

  function handleDelete(e) {
    swal({
      title: "¿Esta seguro que desea eliminar este elemento?",
      text: "¡Una vez eliminado no podrá ser recuperado!",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (ok) => {
      if (!ok) return;

      const url = `${config.apiUrl}users/${e.target.dataset.id}`;

      const result = await fetchData(url, "DELETE");

      if (result?.status !== "success") {
        setError(result.errors);
      } else {
        setError(null);
        getData();
      }
    });
  }

  useEffect(() => {
    const queryPage = new URLSearchParams(window.location.search).get("page");
    const querySearch = new URLSearchParams(window.location.search).get(
      "search"
    );

    if (queryPage) setPage(queryPage);
    if (querySearch) setSearch(querySearch);
  }, []);

  useEffect(() => {
    getData();
  }, [search, page]);

  function handlePaginationClick(e) {
    setPage(e.target.dataset.page);
  }

  return (
    <>
      <Header active="Usuarios" />

      <main className="container-xxl">
        <div className="row">
          <div className="col p-4">
            <div className="row">
              <div className="col">
                <form onSubmit={handleSubmit}>
                  <SearchBox
                    placeHolder="Buscar usuarios"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                </form>
              </div>
              <div className="" style={{ width: "130px" }}>
                <Link to="/user/add" className="btn btn-primary w-100">
                  {" "}
                  <i className="fa fa-plus"></i> Agregar
                </Link>
              </div>
            </div>

            {/* title */}
            <div className="row">
              <div className="col px-3 py-4">
                <h4 className="d-inline me-2">Gestión de usuarios</h4>
                <small className="text-muted">
                  {search && `(Mostrando coincidencias para '${search}' )`}
                </small>
              </div>
            </div>

            {error ? (
              <Alert type="danger" content={error} />
            ) : data ? (
              data.length === 0 ? (
                config.messages.noRecords
              ) : (
                <>
                  <UserList
                    data={data}
                    handleDelete={handleDelete}
                    page={page}
                    search={search}
                  />
                  <Pagination
                    page={page}
                    total={totalRecords}
                    handleClick={handlePaginationClick}
                  />
                </>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

import React from "react";
import { useEffect, useImperativeHandle } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import ErrorPage from "../assets/error.svg";
// import EmptyPage from "../components/EmptyPage";
// import { LoadingSpinnerSvg } from "../assets/allSvg";

const ReactTable = React.forwardRef(
  (
    {
      columns,
      data,
      isLoading = false,
      isError,
      setSelectedRows,
      emptyMessage,
      pageSize,
      height,
    },
    ref
  ) => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [sorting, setSorting] = React.useState([]);

    const table = useReactTable({
      data,
      columns,
      state: {
        rowSelection,
        sorting: sorting,
      },
      onSortingChange: setSorting,
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
      manualPagination: true,
    });

    useImperativeHandle(ref, () => ({
      clearSelection() {
        table.toggleAllRowsSelected(false);
      },
    }));

    useEffect(() => {
      const handleSelectedId = () => {
        const newData =
          data?.length > 0 &&
          setSelectedRows &&
          table
            ?.getSelectedRowModel()
            ?.flatRows?.map(
              (item) => item?.original?.id || item?.original?.student?.id
            );
        setSelectedRows && setSelectedRows(newData);
      };
      handleSelectedId();
    }, [table?.getSelectedRowModel()]);

    return (
      <div
        className={`overflow-auto no-scrollbar border-b-[1px] bg-white rounded-xl ${
          pageSize === "10" && "h-[488px]"
        }`}
      >
        <table className="w-full">
          <thead className="border-b-[1px] border-t-[1px] border-white4">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 bg-[#FFFFFF] py-3 text-left text-[#454545] table_header font-normal text-sm"
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {isLoading || isError || data?.length === 0 ? null : (
            <tbody className="bg-white w-full">
              {table?.getRowModel()?.rows?.map((row, index) => {
                return (
                  <tr key={row.id} className="">
                    {row?.getVisibleCells()?.map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className={`px-3 py-3 text-[#4F4F4F] font-normal text-sm text-gray1 ${
                            index % 2 === 0 ? "text-gray1" : "text-gray1"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {isLoading ? (
          <div className="flex h-[60vh] justify-center items-center">
            <span>Loading...</span>
            {/* <LoadingSpinnerSvg className="h-10" /> */}
          </div>
        ) : isError ? (
          <div
            className={`mt-12 flex flex-col items-center gap-4 ${
              height ? "h-56" : "h-80"
            }`}
          >
            <img src={ErrorPage} alt="error" className="w-[20%]" />
            <span className="font-medium">Something went wrong</span>
          </div>
        ) : data?.length === 0 ? (
          <div
            className={`mt-12 flex flex-col items-center gap-4 ${
              height ? "h-56" : "h-96"
            }`}
          >
            {/* <EmptyPage message={emptyMessage} /> */}
            No data available!
          </div>
        ) : null}
      </div>
    );
  }
);

ReactTable.displayName = "ReactTable";

export { ReactTable };

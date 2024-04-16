/** @format */

import { Button, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
const DOTS = "...";
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = ({
  currentPage,
  onPageChange,
  onPageSizeChanged,
  exportData,
  dataExport,
  headers,
  haveExport,
  totalCount,
  pageSize,
  siblingCount = 1,
  sizeOption = [50, 75, 100, 200],
}) => {
  const { t } = useTranslation();
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  let lastPage = paginationRange[paginationRange.length - 1];
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <>
      {totalCount >= 50 && (
        <div className="pagination">
          <div className="pagination__left">
            <div className="pagination__select">
              <span>{t("hienThi")} &nbsp;</span>
              <select onChange={(e) => onPageSizeChanged(e.target.value)} id="page-size" className="pagination__controls">
                {sizeOption.map((e, key) => (
                  <option value={e} key={key}>
                    {e}
                  </option>
                ))}
              </select>
              <span>&nbsp;{`/${totalCount} ${t("banGhi")}`}</span>
            </div>

            {haveExport && (
              <div data={dataExport} headers={headers}>
                {/* <Tooltip placement="right" title={t("xuatFileExel")}>
        <button className="pagination__export" onClick={exportData}>
        <img src="/static/img/icon/icon-file-export.svg" alt="img" />
        <span>{t("xuatFileExel")}</span>
        </button>
        </Tooltip> */}
              </div>
            )}
          </div>
          <div className="pagination__right">
            <button onClick={() => onPageChange(1)}>
              <img src="/static/img/icon/ic_arr_dbl_left.svg" alt="img" />
            </button>
            <button disabled={currentPage === 1} onClick={() => onPrevious()}>
              <img src="/static/img/icon/ic_arr_left.svg" alt="img" />
            </button>
            {paginationRange.map((pageNumber, key) => {
              // console.log(pageNumber,currentPage, "aaaaaaaa")
              if (pageNumber === DOTS) {
                return <span key={key}>&#8230;</span>;
              } else {
                return (
                  <button onClick={() => onPageChange(pageNumber)} key={key} className={`${pageNumber == currentPage ? "active" : ""}`}>
                    <span>{pageNumber}</span>
                  </button>
                );
              }
            })}
            <button disabled={currentPage === lastPage} onClick={(e) => onNext(e)}>
              <img src="/static/img/icon/ic_arr_right.svg" alt="img" />
            </button>
            <button onClick={() => onPageChange(lastPage)} id="btLast">
              <img src="/static/img/icon/ic_arr_dbl_right.svg" alt="img" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;

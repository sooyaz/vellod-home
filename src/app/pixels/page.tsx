
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Grid = string[][];

type History = {
  past: Grid[];
  future: Grid[];
};

const INITIAL_COLORS = [
  "#FFFFFF",
  "#000000",
  "#F87171",
  "#FB923C",
  "#FBBF24",
  "#A3E635",
  "#34D399",
  "#2DD4BF",
  "#60A5FA",
  "#818CF8",
  "#A78BFA",
  "#F472B6",
];

const CELL_SIZE = 24;
const MAX_DIMENSION = 100;
const MAX_CELLS = 10000;

function createGrid(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "#FFFFFF")
  );
}

export default function DiamondPatternPage() {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);

  const [rowInput, setRowInput] = useState("20");
  const [colInput, setColInput] = useState("20");

  const [grid, setGrid] = useState<Grid>(() =>
    createGrid(20, 20)
  );

  const [history, setHistory] = useState<History>({
    past: [],
    future: [],
  });

  const [palette, setPalette] = useState(INITIAL_COLORS);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [newColor, setNewColor] = useState("#EC4899");
  const [error, setError] = useState("");

  const gridRef = useRef<Grid>(grid);
  const strokeStartRef = useRef<Grid | null>(null);
  const isPaintingRef = useRef(false);

  // 도안과 ref를 함께 갱신합니다.
  const updateGrid = useCallback((nextGrid: Grid) => {
    gridRef.current = nextGrid;
    setGrid(nextGrid);
  }, []);

  // 칸 하나에 현재 선택한 색상을 적용합니다.
  const paintCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      const current = gridRef.current;

      if (current[rowIndex][colIndex] === selectedColor) {
        return;
      }

      const next = current.map((row, r) =>
        r === rowIndex
          ? row.map((color, c) =>
              c === colIndex ? selectedColor : color
            )
          : row
      );

      updateGrid(next);
    },
    [selectedColor, updateGrid]
  );

  // 드래그 한 번을 Undo 한 번으로 처리합니다.
  const finishStroke = useCallback(() => {
    if (!isPaintingRef.current) return;

    isPaintingRef.current = false;

    const start = strokeStartRef.current;
    const end = gridRef.current;

    strokeStartRef.current = null;

    if (start && start !== end) {
      setHistory((current) => ({
        past: [...current.past, start],
        future: [],
      }));
    }
  }, []);

  // 마우스를 도안 밖에서 놓아도 색칠 작업을 종료합니다.
  useEffect(() => {
    window.addEventListener("pointerup", finishStroke);
    window.addEventListener("pointercancel", finishStroke);

    return () => {
      window.removeEventListener("pointerup", finishStroke);
      window.removeEventListener("pointercancel", finishStroke);
    };
  }, [finishStroke]);

  const startPainting = (
    rowIndex: number,
    colIndex: number
  ) => {
    if (isPaintingRef.current) return;

    strokeStartRef.current = gridRef.current;
    isPaintingRef.current = true;

    paintCell(rowIndex, colIndex);
  };
  
  const undo = () => {
    const state = history;

    if (state.past.length === 0) return;

    const current = gridRef.current;
    const previous = state.past[state.past.length - 1];

    updateGrid(previous);

    setHistory({
      past: state.past.slice(0, -1),
      future: [current, ...state.future],
    });
  };

  const redo = () => {
    const state = history;

    if (state.future.length === 0) return;

    const current = gridRef.current;
    const next = state.future[0];

    updateGrid(next);

    setHistory({
      past: [...state.past, current],
      future: state.future.slice(1),
    });
  };


  // 입력값을 검증한 후 새 도안을 생성합니다.
  const createNewPattern = () => {
    const nextRows = Number(rowInput);
    const nextCols = Number(colInput);

    if (
      !Number.isInteger(nextRows) ||
      !Number.isInteger(nextCols) ||
      nextRows < 1 ||
      nextCols < 1
    ) {
      setError("가로와 세로는 1 이상의 정수여야 합니다.");
      return;
    }

    if (
      nextRows > MAX_DIMENSION ||
      nextCols > MAX_DIMENSION ||
      nextRows * nextCols > MAX_CELLS
    ) {
      setError(
        `각 방향은 최대 ${MAX_DIMENSION}칸이며, 전체 도안은 ${MAX_CELLS.toLocaleString()}칸 이하여야 합니다.`
      );
      return;
    }

    const nextGrid = createGrid(nextRows, nextCols);

    setRows(nextRows);
    setCols(nextCols);
    updateGrid(nextGrid);
    setHistory({ past: [], future: [] });
    setError("");
  };

  const addColor = () => {
    if (palette.includes(newColor.toUpperCase())) {
      setSelectedColor(newColor.toUpperCase());
      return;
    }

    const color = newColor.toUpperCase();

    setPalette((current) => [...current, color]);
    setSelectedColor(color);
  };

  const filledCells = grid.reduce(
    (total, row) =>
      total +
      row.filter((color) => color !== "#FFFFFF").length,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 헤더 */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-indigo-600">
              CREATIVE TOOL
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Diamond Pattern Studio
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              격자를 만들고 원하는 색상으로 도안을 완성하세요.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={history.past.length === 0}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↶ Undo
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={history.future.length === 0}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ↷ Redo
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* 왼쪽 도구 패널 */}
          <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <section>
              <h2 className="mb-4 text-base font-semibold">
                도안 크기 설정
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-600">
                  가로 (칸)
                  <input
                    type="number"
                    min={1}
                    max={MAX_DIMENSION}
                    value={colInput}
                    onChange={(event) =>
                      setColInput(event.target.value)
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>

                <label className="text-sm text-slate-600">
                  세로 (칸)
                  <input
                    type="number"
                    min={1}
                    max={MAX_DIMENSION}
                    value={rowInput}
                    onChange={(event) =>
                      setRowInput(event.target.value)
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
              </div>

              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">현재 크기</span>
                  <span className="font-medium">
                    {cols} × {rows}
                  </span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-slate-500">전체 칸 수</span>
                  <span className="font-medium">
                    {(cols * rows).toLocaleString()}칸
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={createNewPattern}
                className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                새 도안 생성
              </button>

              {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-400">
                새 도안을 생성하면 현재 도안과 작업 이력이 초기화됩니다.
              </p>
            </section>

            <div className="border-t border-slate-100" />

            {/* 색상 팔레트 */}
            <section>
              <h2 className="mb-1 text-base font-semibold">
                색상 팔레트
              </h2>
              <p className="mb-4 text-xs text-slate-500">
                색상을 선택한 다음 격자를 클릭하거나 드래그하세요.
              </p>

              <div className="grid grid-cols-6 gap-2">
                {palette.map((color) => {
                  const isSelected = selectedColor === color;

                  return (
                    <button
                      key={color}
                      type="button"
                      title={color}
                      aria-label={`${color} 색상 선택`}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedColor(color)}
                      className={`aspect-square rounded-md border transition ${
                        isSelected
                          ? "scale-105 ring-2 ring-indigo-600 ring-offset-2"
                          : "border-slate-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="new-color"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  사용자 지정 색상
                </label>

                <div className="flex items-center gap-2">
                  <input
                    id="new-color"
                    type="color"
                    value={newColor}
                    onChange={(event) =>
                      setNewColor(event.target.value.toUpperCase())
                    }
                    className="h-10 w-12 cursor-pointer rounded border border-slate-200 bg-white p-1"
                  />
                  <span className="flex-1 font-mono text-sm text-slate-600">
                    {newColor.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={addColor}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    추가
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-indigo-50 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-5 w-5 rounded border border-slate-300"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-sm font-medium text-indigo-950">
                    선택 색상
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-indigo-700">
                  {selectedColor}
                </p>
              </div>
            </section>
          </aside>

          {/* 오른쪽 도안 편집 영역 */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-semibold">도안 편집기</h2>
                <p className="mt-1 text-xs text-slate-500">
                  칸을 누르고 이동하면 연속해서 색칠할 수 있습니다.
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">
                  {cols} × {rows}
                </p>
                <p className="text-xs text-slate-500">
                  색칠된 칸 {filledCells}개
                </p>
              </div>
            </div>

            <div className="bg-slate-100 p-4 sm:p-6">
              <div className="max-h-[70vh] overflow-auto rounded-lg border border-slate-200 bg-white p-4">
                <div
                  className="mx-auto w-fit touch-none select-none"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
                    gridAutoRows: `${CELL_SIZE}px`,
                    borderTop: "1px solid #CBD5E1",
                    borderLeft: "1px solid #CBD5E1",
                  }}
                >
                  {grid.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        type="button"
                        aria-label={` ${rowIndex + 1}행 ${colIndex + 1}열`}
                        onPointerDown={(event) => {
                          event.preventDefault();
                          startPainting(rowIndex, colIndex);
                        }}
                        onPointerEnter={() => {
                          if (isPaintingRef.current) {
                            paintCell(rowIndex, colIndex);
                          }
                        }}
                        className="m-0 block cursor-crosshair border-0 border-r border-b border-solid border-slate-300 p-0 outline-none hover:brightness-95"
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          backgroundColor: color,
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-5 py-3 text-xs text-slate-500">
              <span>각 칸은 24 × 24px로 표시됩니다.</span>
              <span>
                Undo {history.past.length} · Redo {history.future.length}
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
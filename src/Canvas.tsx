import { Rectangle } from "./types";
import Draggable from "react-draggable";
import { BsPlus, BsThreeDots } from "react-icons/bs";
import { Resizable } from "react-resizable";

import "./react-resizable.css";
import classNames from "classnames";
const distanceBetweenDraggable = 0;
const Canvas = ({
  rectangles,
  setRectangles,
  selectedIds,
  onClick,
}: {
  selectedIds: Set<string>;
  rectangles: Rectangle[];
  onClick(e: React.MouseEvent, rect: Rectangle): void;
  setRectangles(rectangles: Rectangle[]): void;
}) => {
  return (
    <div className="grow bg-white relative">
      {rectangles.map((rect) => {
        const isSelected = selectedIds.has(rect.id);
        console.log("~~~", isSelected);

        return (
          <div
            onClick={(e) => onClick(e, rect)}
            onDoubleClick={(e) => onClick(e, rect)}
            className="absolute"
            style={{
              left: rect.left,
              top: rect.top,
              ...rect,
              zIndex: selectedIds.has(rect.id) && 10,
            }}
          >
            <Resizable
              width={rect.width}
              height={rect.height}
              onResize={(e, data) => {
                e.stopPropagation();
                e.preventDefault();
                const height = data.size.height;
                const width = data.size.width;
                rect.height = height;
                rect.width = width;
                setRectangles([...rectangles]);
              }}
            >
              <div>
                {" "}
                <Draggable
                  key={rect.id}
                  position={{
                    x: 0,
                    y: 0,
                  }}
                  onStart={(e) => onClick(e, rect)}
                  onDrag={(e, data) => {
                    const { x, y } = data;
                    rect.left += x;
                    rect.top += y;

                    setRectangles([...rectangles]);
                  }}
                >
                  <div
                    className={classNames("cursor-grab border-dotted", {
                      "border-2 border-blue": isSelected,
                    })}
                    style={{
                      width: rect.width,
                      height: rect.height,
                      backgroundColor: rect.color,
                    }}
                  >
                    <div className="relative h-full w-full"></div>
                  </div>
                </Draggable>
              </div>
            </Resizable>
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;

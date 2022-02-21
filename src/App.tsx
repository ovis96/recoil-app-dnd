import logo from "./logo.svg";
import "./App.css";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import Canvas from "./Canvas.tsx";
import { uuid } from "uuidv4";
import { Rectangle } from "./types";
import { colors } from "./const.ts";

const ComponentAddButton = ({ name, icon, onClick = () => {} }) => {
  return (
    <div
      className="flex flex-row rounded border-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex pl-2 items-center">{icon}</div>
      <span className="ml-2 select-none">{name}</span>
    </div>
  );
};

const NavBar = ({ rectangles, addNewRectangle }) => {
  return (
    <div className="w-[250px] bg-purple h-screen p-4" style={{ zIndex: 10000 }}>
      <ComponentAddButton
        name="Rectangle"
        icon={<BsPlusCircle className="icon" />}
        onClick={() => addNewRectangle()}
      />
      {rectangles.map((rect) => {
        return (
          <div>
            {" "}
            X: {rect.left}, Y: {rect.top}{" "}
          </div>
        );
      })}
    </div>
  );
};
const getNewRectangle = () => {
  return {
    id: Math.random().toString(16).toUpperCase().slice(10),
    left: Math.floor(250 + Math.random() * 1000),
    top: Math.floor(100 + Math.random() * 500),
    height: 70,
    width: 70,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};
function App() {
  const [rectangles, setRectangles] = useState<Rectangle[]>(
    Array(1)
      .fill(undefined)
      .map(() => getNewRectangle())
  );
  const [selectedIds, setSelectedIds] = useState(new Set<string>());
  const addNewRectangle = () => {
    const newRectangles = [...rectangles];

    console.log(colors[Math.floor(Math.random() * colors.length)]);

    newRectangles.push(getNewRectangle());
    console.log("~~~", newRectangles);

    setRectangles(newRectangles);
  };

  return (
    <div className="flex flex-row">
      <NavBar
        rectangles={rectangles}
        addNewRectangle={() => addNewRectangle()}
      />
      <Canvas
        rectangles={rectangles}
        setRectangles={setRectangles}
        selectedIds={selectedIds}
        onClick={(e, rect) => {
          console.log("~~ wjat", e.button);

          if (e.button === 1) {
            rect.color = colors[Math.floor(Math.random() * colors.length)];
            setRectangles([...rectangles]);
          }
          const selectedIds = new Set([rect.id]);
          setSelectedIds(selectedIds);
          console.log(selectedIds);
        }}
      />
    </div>
  );
}

export default App;
